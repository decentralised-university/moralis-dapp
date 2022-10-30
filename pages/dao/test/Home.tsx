import React, { useEffect, useState } from "react";
import { Widget, Tag, Table, Form } from "@web3uikit/core";
import { Link } from "react-router-dom";
import { MoralisProvider, useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import Moralis from "moralis";
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

export function Home() {
  const [passRate, setPassRate] = useState(0);
  const [totalP, setTotalP] = useState(0);
  const [counted, setCounted] = useState(0);
  const [voters, setVoters] = useState(0);
  // const { Moralis, isInitialized } = useMoralis();
  // const { isInitialized } = useMoralis();
  const [proposals, setProposals] = useState();
  // const Web3Api = useMoralisWeb3Api();
  const [sub, setSub] = useState();
  // const contractProcessor = useWeb3ExecuteFunction();

  // Moralis.start({ serverUrl: 'https://shsgffygizec.usemoralis.com:2053/server', appId: 'wfaERX2SQjRaJsW0GEwdILsuDGt31CGjuJzBsiv9' });
  // Moralis.start({ apiKey: "\1k4I5GjIg1O7yyncrXZ1amqNFSOT33gY7HnQBH2JHDuEWDPQUJRphRkVtGeYoRtY"})
  
  async function createProposal(newProposal: any) {
    let options = {
      contractAddress: "0xF1B01483416f403a449cC01B72E9879194Ee0FF8",
      functionName: "createProposal",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "_canVote",
              type: "address[]",
            },
          ],
          name: "createProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      params: {
        _description: newProposal,
        _canVote: voters,
      },
    };


    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Proposal Successful");
        setSub(false);
      },
      onError: (error) => {
        alert(error.data.message);
        setSub(false);
      },
    });


  }


  async function getStatus(proposalId: any) {
    const ProposalCounts = Moralis.Object.extend("ProposalCounts");
    const query = new Moralis.Query(ProposalCounts);
    query.equalTo("uid", proposalId);
    const result = await query.first();
    if (result !== undefined) {
      if (result.attributes.passed) {
        return { color: "green", text: "Passed" };
      } else {
        return { color: "red", text: "Rejected" };
      }
    } else {
      return { color: "blue", text: "Ongoing" };
    }
  }

  useEffect(() => {
    if (isInitialized) {

      async function getProposals() {
        const Proposals = Moralis.Object.extend("Proposals");
        const query = new Moralis.Query(Proposals);
        query.descending("uid_decimal");
        const results = await query.find();
        const table = await Promise.all(
          results.map(async (e) => [
            e.attributes.uid,
            e.attributes.description,
            <Link to="/proposal" state={{
              description: e.attributes.description,
              color: (await getStatus(e.attributes.uid)).color,
              text: (await getStatus(e.attributes.uid)).text,
              id: e.attributes.uid,
              proposer: e.attributes.proposer
              
              }}>
              <Tag
                color={(await getStatus(e.attributes.uid)).color}
                text={(await getStatus(e.attributes.uid)).text}
              />
            </Link>,
          ])
        );
        setProposals(table);
        setTotalP(results.length);
      }


      async function getPassRate() {
        const ProposalCounts = Moralis.Object.extend("ProposalCounts");
        const query = new Moralis.Query(ProposalCounts);
        const results = await query.find();
        let votesUp = 0;

        results.forEach((e) => {
          if (e.attributes.passed) {
            votesUp++;
          }
        });

        setCounted(results.length);
        setPassRate((votesUp / results.length) * 100);
      }


      const fetchTokenIdOwners = async () => {
        const options = {
          address: "0x6d818827046A47db24E08d0E7799E21E384901c4",
          // token_id: [1,2,3,4],
          chain: "goerli",
        };
        const tokenIdOwners = await Web3Api.token.getTokenIdOwners(options);
        const addresses = tokenIdOwners.result.map((e) => e.owner_of);
        setVoters(addresses);
      };


      fetchTokenIdOwners();
      getProposals();
      getPassRate();
      
    }
  }, [isInitialized]);


  return (
    <>    
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={totalP}
                  title="Proposals Created"
                  style={{ width: "200%" }}
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div
                        className="progressPercentage"
                        style={{ width: `${passRate}%` }}
                      ></div>
                    </div>
                  </div>
                </Widget>
                <Widget info={voters.length} title="Eligible Voters" />
                <Widget info={totalP-counted} title="Ongoing Proposals" />
              </div>
              Recent Proposals
              <div style={{ marginTop: "30px" }}>
                <Table
                  columnsConfig="10% 70% 20%"
                  data={proposals}
                  header={[
                    <span>ID</span>,
                    <span>Description</span>,
                    <span>Status</span>,
                  ]}
                  pageSize={5}
                />
              </div>

              <Form
                  buttonConfig={{
                    isLoading: sub,
                    loadingText: "Submitting Proposal",
                    text: "Submit",
                    theme: "secondary",
                  }}
                  data={[
                    {
                      inputWidth: "100%",
                      name: "New Proposal",
                      type: "textarea",
                      validation: {
                        required: true,
                      },
                      value: "",
                    },
                  ]}
                  onSubmit={(e) => {
                    setSub(true);
                    createProposal(e.data[0].inputResult);
                  }}
                  title="Create a New Proposal"
                />
            </div>  
    </>
  );
};

export default Home;