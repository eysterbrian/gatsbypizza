import path from 'path'; // Built-in Node API
import fetch from 'isomorphic-fetch';

async function createPizzaPages({ graphql, actions }) {
  // Query just enough info to know which pages to generate.
  // Each page component will perform its own query to populate the actual page
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current, // $slug is used as variable in page query
      },
    });
  });
}

async function createToppingPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  const toppingTemplate = path.resolve('./src/templates/Topping.js');
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        toppingName: topping.name,
      },
    });
  });
}

// Note that 'actions' are all the actions bound into Gatsby's internal Redux store
async function sourceBeers({ actions, createNodeId, createContentDigest }) {
  console.log('=== Fetching  beers');

  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer', // Used for GraphQL type and top-level queries like 'allBeer' and 'beer'
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer), // Gatsby's cache mechanism
      },
    };

    // Call the action on the Gatsby redux store to create/add the node
    actions.createNode({ ...beer, ...nodeMeta });
  });
}

export async function sourceNodes(params) {
  await sourceBeers(params);
}

// TODO: Create pages for slicemasters

export async function createPages(params) {
  console.log(' **** Calling createPages');

  // Both these createXXXPages methods are async, but they're independent of each other,
  // so we can run them concurrently!!
  // Make sure to await this!!
  await Promise.all([createPizzaPages(params), createToppingPages(params)]);
}
