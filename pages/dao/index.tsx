import { Default } from 'components/layouts/Default';
import * as types from 'next/types';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { Forums } from 'components/templates/forums';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { Dao } from 'components/templates/dao';
import { IDao } from 'components/templates/dao/types';


const DaoPage: NextPage<IDao> = (props) => {

  return (
    <Default pageName="Forums">
      <Dao {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
  
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  
    if (!session?.user.address) {
      return { props: { error: 'Connect your wallet first' } };
    }



    
  
    return {
      props: {},
    };
  };


export default DaoPage;