import { ethers } from 'ethers';

// Token contract addresses
const TRC20_USDT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // TRON USDT
const BEP20_USDT = '0x55d398326f99059fF775485246999027B3197955'; // BSC USDT

// ERC20/BEP20 ABI for balanceOf
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
];

// BSC Mainnet RPC
const BSC_RPC = 'https://bsc-dataseed1.binance.org/';

export interface TokenBalance {
  symbol: string;
  balance: string;
  contractAddress: string;
  decimals: number;
}

/**
 * Get TRC20 USDT balance on TRON network
 */
export async function getTRC20USDTBalance(address: string): Promise<string> {
  try {
    // Get TronWeb from window (loaded via CDN)
    if (typeof window === 'undefined' || !(window as any).TronWeb) {
      console.error('TronWeb not available');
      return '0';
    }
    
    const TronWeb = (window as any).TronWeb;
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });

    // Get TRC20 token balance using TronWeb
    const contractInstance = await tronWeb.contract().at(TRC20_USDT);
    const balanceResult = await contractInstance.balanceOf(address).call();
    
    // TRC20 USDT has 6 decimals
    // Convert balance to number and divide by decimals
    const balanceStr = balanceResult.toString();
    const balanceNum = parseFloat(balanceStr) / 1000000; // Divide by 6 decimals
    
    return balanceNum.toFixed(6);
  } catch (error) {
    console.error('Error fetching TRC20 USDT balance:', error);
    return '0';
  }
}

/**
 * Get BEP20 USDT balance on Binance Smart Chain
 */
export async function getBEP20USDTBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(BSC_RPC);
    const contract = new ethers.Contract(BEP20_USDT, ERC20_ABI, provider);
    
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    
    // Format balance with correct decimals
    const formattedBalance = ethers.formatUnits(balance, decimals);
    return formattedBalance;
  } catch (error) {
    console.error('Error fetching BEP20 USDT balance:', error);
    return '0';
  }
}

/**
 * Get all token balances for a wallet
 */
export async function getAllTokenBalances(
  address: string,
  networkType: 'tron' | 'bnb'
): Promise<TokenBalance[]> {
  const balances: TokenBalance[] = [];

  try {
    if (networkType === 'tron') {
      // TRC20 USDT
      const trc20Balance = await getTRC20USDTBalance(address);
      balances.push({
        symbol: 'USDT',
        balance: trc20Balance,
        contractAddress: TRC20_USDT,
        decimals: 6,
      });
    } else if (networkType === 'bnb') {
      // BEP20 USDT
      const bep20Balance = await getBEP20USDTBalance(address);
      balances.push({
        symbol: 'USDT',
        balance: bep20Balance,
        contractAddress: BEP20_USDT,
        decimals: 18,
      });
    }
  } catch (error) {
    console.error('Error fetching token balances:', error);
  }

  return balances;
}

