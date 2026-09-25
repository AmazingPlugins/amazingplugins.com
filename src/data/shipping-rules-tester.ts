export const shippingTester = {
  name: 'AP Shipping Rules Tester for WooCommerce',
  shortName: 'Shipping Rules Tester',
  path: '/plugins/shipping-rules-tester-for-woocommerce/',
  source: 'https://github.com/AmazingPlugins/shipping-rules-tester-for-woocommerce',
  status: 'Submitted for review',
  version: '1.2.0',
  description: 'Check WooCommerce shipping zones and local rates with sample destinations and packages. Compare scenarios without changing your store settings.',
};

export const shippingFAQs = [
  {
    question: 'Is Shipping Rules Tester available on WordPress.org?',
    answer: 'The plugin has been submitted for review. A WordPress.org install link will be added here after approval. You can view the source and installation instructions on GitHub now.',
  },
  {
    question: 'Will a test change my shipping settings or create an order?',
    answer: 'No. The tester reads your current configuration and calculates a sample result. It does not change shipping settings, products, orders, or customers. Test inputs and results are not saved.',
  },
  {
    question: 'Which shipping methods can I test?',
    answer: 'The tester supports built-in flat rate, free shipping, and local pickup when they can be calculated from a sample package. Methods that need live cart data or an external provider are marked as skipped, with an explanation.',
  },
  {
    question: 'Does it fetch live rates from shipping carriers?',
    answer: 'No. External shipping providers are never called. Test carrier rates and integrations separately at your store checkout.',
  },
  {
    question: 'Can I use saved products and compare destinations?',
    answer: "Yes. Select a saved product to use its price, weight, dimensions, shipping class, and tax class. You can also build a multi-item package. Choose Keep result and test another to compare scenarios in the current browser tab. Comparisons clear when you leave the page or choose Clear comparison.",
  },
  {
    question: 'Does this replace a real checkout test?',
    answer: "No. Sample packages don't include coupons, customer roles, subscriptions, or live-cart state. Use the tester to investigate local shipping rules, then check the full customer journey at checkout.",
  },
  {
    question: 'What does my store need to run it?',
    answer: 'WordPress 6.6 or later, PHP 7.4 or later, and an active WooCommerce installation. It works with HPOS because it does not depend on order storage. Package values use your store currency and weights use your configured weight unit.',
  },
];
