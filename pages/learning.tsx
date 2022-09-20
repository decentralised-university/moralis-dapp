import { Default } from 'components/layouts/Default';
import { Learning } from 'components/templates/learning';
// import { GetServerSideProps, NextPage } from 'next';
// import { getSession } from 'next-auth/react';
import { ITransactions, Transactions } from 'components/templates/transactions';
import Moralis from 'moralis';

const LearningPage: NextPage<ITransactions> = (props) => {
    return (
      <Default pageName="Learning">
        <Learning {...props} />
      </Default>
    );
  };


export default LearningPage;
