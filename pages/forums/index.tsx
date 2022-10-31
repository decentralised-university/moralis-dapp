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
import { Button, Heading, HStack } from '@chakra-ui/react';
import { Card } from 'components/modules/Card';


const ForumsHomePage: NextPage<IForums> = (props) => {



  return (
    <Default pageName="ForumsHomePage">
      {/* <ForumsHomePage {...props} /> */}
      <Heading mb={6}>
        Forums Home Page
      </Heading>
      <HStack>
        <Card title="General" summary="Ask general questions about the Decentralised University here." />
        <Card title="Learning" summary="Ask anything related to learning content at DU." />
        <Card title="Societies" summary="Ask anything related to groups & societies at DU." />
      </HStack>
      <HStack mt={5}>
        <Card title="Example 4" summary="This is the place to ask anything about this topic." />
        <Card title="Example 5" summary="This is the place to ask anything about this topic." />
        <Card title="Example 6" summary="This is the place to ask anything about this topic." />
      </HStack>
    </Default>
  );
};

export default ForumsHomePage;