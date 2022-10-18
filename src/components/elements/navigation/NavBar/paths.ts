import { Hero } from '@web3uikit/core';
import { Children } from 'react';
import { ISubNav } from '../SubNav/SubNav';

const NAV_LINKS: ISubNav[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Forums',
    href: '/forums',
  },
  {
    label: 'Your Wallet',
    href: '/balances',
    children: [
      {
        label: 'ERC20 Balances',
        subLabel: 'Get your ERC20 balances',
        href: '/balances/erc20',
        logo: 'token',
      },
      {
        label: 'ERC20 Transfers',
        subLabel: 'Get your ERC20 transfers',
        href: '/transfers/erc20',
        logo: 'chest',
      },
      {
        label: 'NFT Balances',
        subLabel: 'Get your ERC721 an ERC1155 balances',
        href: '/balances/nft',
        logo: 'pack',
      },
      {
        label: 'NFT Transfers',
        subLabel: 'Get your ERC721 an ERC1155 transfers',
        href: '/transfers/nft',
        logo: 'lazyNft',
      },
      {
        label: 'Transactions',
        subLabel: 'Get all your transactions',
        href: '/transactions',
        logo: 'marketplace',
      },
    ],
  },
  {
    label: 'DAO',
    href: '/dao',
  }
];

export default NAV_LINKS;
