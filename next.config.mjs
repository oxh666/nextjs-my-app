import withMDX from '@next/mdx';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mdxConfig = withMDX({
  extension: /\.mdx?$/
});

export default {
  ...mdxConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
      }));
    }

    return config;
  },
};
