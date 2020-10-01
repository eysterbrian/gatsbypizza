import path from 'path'; // Built-in Node API

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
    console.log(`Creating page for ${pizza.slug.current}`);
  });
}

// TODO: Create pages for toppings
// TODO: Create pages for slicemasters

export async function createPages(params) {
  console.log(' **** Calling createPages');
  await createPizzaPages(params);
}
