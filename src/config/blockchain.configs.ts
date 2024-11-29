import { ChoiceType } from '../core/prompt/prompt.type';

type EndpointHandler = (data: any) => any;

interface Endpoint {
    path: string;
    handler: EndpointHandler;
}

interface BlockchainConfig {
    baseUrl: string;
    endpoints: { [key: string]: Endpoint };
}

export const choicesArray: ChoiceType =
    [['cosmoshub', 'stride', 'quicksilver', 'govgen', 'bitcanna', 'likecoin', 'uptik'], [
        "Current block height",
        "Number of transactions in the block",
        "Inflation",
        "List of active validators",
        "List of inactive validators",
        "Information about the connected node",
        "Number of transactions in the last block (indicates activity)",
        "Active proposals for voting"
    ]]


export const requestMapping: { [key: string]: string } = {
    "Current block height": "blockHeight",
    "Number of transactions in the block": "lastBlockTxCount",
    "Inflation": "inflation",
    "List of active validators": "activeValidators",
    "List of inactive validators": "inactiveValidators",
    "Information about the connected node": "nodeInfo",
    "Number of transactions in the last block (indicates activity)": "lastBlockTxCount",
};


export const commonEndpoints: { [key: string]: Endpoint } = {
    blockHeight: {
        path: 'cosmos/base/tendermint/v1beta1/blocks/latest',
        handler: (data: any) => data.block.header.height,
    },
    activeValidators: {
        path: 'cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED',
        handler: (data: any) =>
            data.validators.map((validator: any) => validator.description.moniker),
    },
    inflation: {
        path: 'cosmos/mint/v1beta1/inflation',
        handler: (data: any) => data.inflation
    },
    inactiveValidators: {
        path: 'cosmos/staking/v1beta1/validators?status=BOND_STATUS_UNBONDED',
        handler: (data: any) =>
            data.validators.map((validator: any) => validator.description.moniker),
    },
    nodeInfo: {
        path: '/cosmos/base/tendermint/v1beta1/node_info',
        handler: (data: any) => data
    },
    lastBlockTxCount: {
        path: 'cosmos/base/tendermint/v1beta1/blocks/latest',
        handler: (data: any) => data.block.data.txs.length
    },



};

export const blockchainConfigs: { [key: string]: BlockchainConfig } = {
    cosmoshub: {
        baseUrl: 'https://api.cosmoshub-4.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    stride: {
        baseUrl: 'https://api.stride.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    quicksilver: {
        baseUrl: 'https://api.quicksilver.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    govgen: {
        baseUrl: 'https://api.govgen.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    bitcanna: {
        baseUrl: 'https://api.bitcanna.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    likecoin: {
        baseUrl: 'https://api.likecoin.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
    uptick: {
        baseUrl: 'https://api.uptick.citizenweb3.com/',
        endpoints: commonEndpoints,
    },
}