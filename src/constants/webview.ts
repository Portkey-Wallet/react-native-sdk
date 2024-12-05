// import AElf from 'aelf-sdk';
export const MESSAGE_PREFIX = 'aelf://aelf.io';

export const SUPPORTED_EC = ['secp256k1'];

export const CHAIN_APIS = {
  '/api/blockChain/chainStatus': 'getChainStatus',
  '/api/blockChain/blockState': 'getChainState',
  '/api/blockChain/contractFileDescriptorSet': 'getContractFileDescriptorSet',
  '/api/blockChain/blockHeight': 'getBlockHeight',
  '/api/blockChain/block': 'getBlock',
  '/api/blockChain/blockByHeight': 'getBlockByHeight',
  '/api/blockChain/transactionResult': 'getTxResult',
  '/api/blockChain/transactionResults': 'getTxResults',
  '/api/blockChain/merklePathByTransactionId': 'getMerklePathByTxId',
};

export const MOCK_ACCOUNT_RES1 = {
  accounts: [
    {
      name: 'test',
      address: 'mfzJTsv5UGQGoZw4gdrivTihVoZgtdm2f8ppnY7W2t6nGYfS1',
    },
  ],
  chains: [
    {
      url: 'http://192.168.66.251:8000',
      isMainChain: true,
      chainId: 'AELF',
    },
  ],
};

// export const MOCK_ACCOUNT_RES2 = {
//   accounts: [
//     {
//       name: 'test',
//       address: 'PhxFvf8eMxKxrQZZNbLvmnsjwAfGShEvkPBDcjkF4qX7vsa2K',
//     },
//   ],
//   chains: [
//     {
//       url: 'http://192.168.66.251:8000',
//       isMainChain: true,
//       chainId: 'AELF',
//     },
//   ],
// };

export const app2dAppPublicKey =
  '045647c4e11f98c413eabdcf0c605e91816fde96e9d63fb0c810f146951e12f35839d6cee8ad619d9679a8f331759d693f9c5e26bd5a64fb471fc6569e8b675f5e';
