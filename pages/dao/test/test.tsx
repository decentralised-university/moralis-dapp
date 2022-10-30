import React, { useEffect, useState } from "react";
import { Widget, Tag, Table, Form } from "@web3uikit/core";
import { Link } from "react-router-dom";
import Moralis from "moralis";
import { EvmChain } from '@moralisweb3/evm-utils';

import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Box, Heading, Text } from "@chakra-ui/react";
import { Default } from "components/layouts/Default";
import { Proposals } from "components/templates/proposals";
  



export function Dao({pointsAddress, Proposals}) {

  return (
    <Default pageName={"Dao"}>
      <Heading>
      HEllo DAO
      </Heading>
      <Heading>
            <Text>Wallet: {pointsAddress}</Text>
            <Text>Native Balance: {Proposals} ETH</Text>
      </Heading>
    </Default>
  );
};

export async function getServerSideProps(context: any) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  const session = await getSession(context);

  const address = session?.user.address;
  const chain = EvmChain.GOERLI;

  const daoAddress = '0xF1B01483416f403a449cC01B72E9879194Ee0FF8';
  const pointsAddress= '0x41f41C3BCBfB2b5AE57c39BD654109c8eD98872f';

  // const abi = []; // Add ABI
  // const functionName = 'balanceOf';
  
  
  
  const Proposals = await Moralis.EvmApi.utils.runContractFunction({
      abi: {
        "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
        "name":"Proposals",
        "outputs":[{"internalType":"uint256","name":"id","type":"uint256"},
                   {"internalType":"bool","name":"exists","type":"bool"},
                   {"internalType":"string","name":"description","type":"string"},
                   {"internalType":"uint256","name":"deadline","type":"uint256"},
                   {"internalType":"uint256","name":"votesUp","type":"uint256"},
                   {"internalType":"uint256","name":"votesDown","type":"uint256"},
                   {"internalType":"bool","name":"countConducted","type":"bool"},
                   {"internalType":"bool","name":"passed","type":"bool"}
                  ],
        "stateMutability":"view",
        "type":"function"
        },
      functionName: 'Proposals',
      address: daoAddress, 
      chain,
  });
  console.log(Proposals.result);




  return {
      props: { pointsAddress, Proposals: Proposals.result },
  };
}

export default Dao;