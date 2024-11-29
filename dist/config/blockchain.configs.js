"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainConfigs = exports.commonEndpoints = exports.requestMapping = exports.choicesArray = void 0;
exports.choicesArray = [['cosmoshub', 'stride', 'quicksilver', 'govgen', 'bitcanna', 'likecoin', 'uptik'], [
        "Current block height",
        "Number of transactions in the block",
        "Inflation",
        "List of active validators",
        "List of inactive validators",
        "Information about the connected node",
        "Number of transactions in the last block (indicates activity)",
        "Active proposals for voting"
    ]];
exports.requestMapping = {
    "Current block height": "blockHeight",
    "Number of transactions in the block": "lastBlockTxCount",
    "Inflation": "inflation",
    "List of active validators": "activeValidators",
    "List of inactive validators": "inactiveValidators",
    "Information about the connected node": "nodeInfo",
    "Number of transactions in the last block (indicates activity)": "lastBlockTxCount",
};
exports.commonEndpoints = {
    blockHeight: {
        path: 'cosmos/base/tendermint/v1beta1/blocks/latest',
        handler: (data) => data.block.header.height,
    },
    activeValidators: {
        path: 'cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED',
        handler: (data) => data.validators.map((validator) => validator.description.moniker),
    },
    inflation: {
        path: 'cosmos/mint/v1beta1/inflation',
        handler: (data) => data.inflation
    },
    inactiveValidators: {
        path: 'cosmos/staking/v1beta1/validators?status=BOND_STATUS_UNBONDED',
        handler: (data) => data.validators.map((validator) => validator.description.moniker),
    },
    nodeInfo: {
        path: '/cosmos/base/tendermint/v1beta1/node_info',
        handler: (data) => data
    },
    lastBlockTxCount: {
        path: 'cosmos/base/tendermint/v1beta1/blocks/latest',
        handler: (data) => data.block.data.txs.length
    },
};
exports.blockchainConfigs = {
    cosmoshub: {
        baseUrl: 'https://api.cosmoshub-4.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    stride: {
        baseUrl: 'https://api.stride.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    quicksilver: {
        baseUrl: 'https://api.quicksilver.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    govgen: {
        baseUrl: 'https://api.govgen.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    bitcanna: {
        baseUrl: 'https://api.bitcanna.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    likecoin: {
        baseUrl: 'https://api.likecoin.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
    uptick: {
        baseUrl: 'https://api.uptick.citizenweb3.com/',
        endpoints: exports.commonEndpoints,
    },
};
