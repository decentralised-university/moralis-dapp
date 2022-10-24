import { Default } from 'components/layouts/Default';
import * as types from 'next/types';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { Forums } from 'components/templates/forums';
import { ITransactions, Transactions } from 'components/templates/transactions';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import getErc20LogoAddress from 'utils/getErc20LogoAddress';
import Moralis from 'moralis';
import { ERC20Balances, IERC20Balances } from 'components/templates/balances/ERC20';
import { IForums } from 'components/templates/forums/types';


const ForumsPage: NextPage<IForums> = (props) => {
  return (
    <Default pageName="Forums">
      <Forums {...props} />
    </Default>
  );
};

export default ForumsPage;