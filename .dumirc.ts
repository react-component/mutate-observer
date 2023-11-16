// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'mutate-observer',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: '.doc',
  exportStatic: {},
  styles: [
    `
      section.dumi-default-header-left  {
        width: 240px;
      }
      .markdown table {
        width: auto !important;
      }
    `,
  ],
});
