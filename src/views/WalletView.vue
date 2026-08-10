<template>
  <div class="pt-28 pb-20 container mx-auto px-4 font-outfit max-w-7xl animate-in fade-in duration-700">
    <header class="mb-12 text-center relative">
      <div class="inline-flex items-center gap-2 bg-[#F0B90B]/10 border border-[#F0B90B]/30 px-4 py-1.5 rounded-full text-xs font-black text-[#F0B90B] tracking-widest uppercase mb-4">
        <i class="fa-solid fa-vault"></i>
        BINANCE MULTI-ASSET FINANCIAL VAULT
      </div>
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter">
        WALLET & <span class="text-gradient">EXCHANGE</span>
      </h1>
      <p class="text-gray-400 text-xs md:text-sm uppercase tracking-[0.4em] mt-3">Deposit crypto, withdraw earnings, and swap tokens instantly</p>
    </header>

    <CryptoDepositModal v-if="showDepositModal" @close="showDepositModal = false" />
    <TwoFactorAuthModal v-if="show2faModal" @close="show2faModal = false" @verified="executeWithdrawal" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <!-- Balance Cards -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- USD Balance -->
        <div class="glass p-8 rounded-[35px] border-[#F0B90B]/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#1E2329] to-[#0B0E11] group">
          <div class="absolute top-0 right-0 p-8 opacity-5">
            <div class="text-9xl text-[#F0B90B] font-bold">$</div>
          </div>
          <div class="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Available USD Balance</div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2 font-mono">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs">
            <span class="text-[#0ECB81] font-black uppercase tracking-wider">Verified & SAFU Secured</span>
            <button @click="showDepositModal = true" class="text-[#F0B90B] font-black uppercase hover:underline">Deposit Crypto ➜</button>
          </div>
        </div>

        <!-- Crypto Portfolio -->
        <div class="glass p-8 rounded-[35px] border-orange-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#1E2329] to-[#0B0E11] group">
          <div class="absolute top-0 right-0 p-8 opacity-5">
            <div class="text-9xl text-orange-500 font-bold">₿</div>
          </div>
          <div class="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Crypto Portfolio</div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2 font-mono">{{ cryptoBalance.toFixed(4) }} BTC</div>
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs">
            <span class="text-gray-400 font-bold">≈ ${{ (cryptoBalance * 67420).toLocaleString() }} USD</span>
            <button @click="activeTab = 'swap'" class="text-orange-400 font-black uppercase hover:underline">Instant Swap ➜</button>
          </div>
        </div>

        <!-- Main Action Tabs Form -->
        <div class="md:col-span-2 glass p-8 md:p-10 rounded-[40px] border-white/10 shadow-2xl bg-[#161618]">
          <!-- Tabs Navigation -->
          <div class="flex gap-4 mb-8 border-b border-white/5 pb-4">
            <button @click="activeTab = 'deposit'" :class="activeTab === 'deposit' ? 'bg-[#F0B90B] text-black font-black' : 'bg-white/5 text-gray-400 hover:text-white'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all">
              <i class="fa-solid fa-arrow-down-left mr-1"></i> Deposit
            </button>
            <button @click="activeTab = 'withdraw'" :class="activeTab === 'withdraw' ? 'bg-[#F0B90B] text-black font-black' : 'bg-white/5 text-gray-400 hover:text-white'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all">
              <i class="fa-solid fa-arrow-up-right mr-1"></i> Withdraw
            </button>
            <button @click="activeTab = 'swap'" :class="activeTab === 'swap' ? 'bg-[#F0B90B] text-black font-black' : 'bg-white/5 text-gray-400 hover:text-white'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all">
              <i class="fa-solid fa-right-left text-[#F0B90B] mr-1"></i> Instant Swap
            </button>
          </div>

          <!-- Deposit Tab -->
          <div v-if="activeTab === 'deposit'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-white/5 rounded-3xl border border-white/10 text-center space-y-4">
                <i class="fa-brands fa-bitcoin text-4xl text-[#F0B90B]"></i>
                <h3 class="text-xl font-black uppercase">Crypto Deposit</h3>
                <p class="text-xs text-gray-400">Deposit BTC, ETH, USDT (TRC20/ERC20/BEP20) or SOL with instant 12-block confirmation.</p>
                <button @click="showDepositModal = true" class="btn-primary w-full py-4 text-xs uppercase tracking-widest">GENERATE DEPOSIT QR ➜</button>
              </div>

              <div class="p-6 bg-white/5 rounded-3xl border border-white/10 text-center space-y-4">
                <i class="fa-solid fa-credit-card text-4xl text-[#0ECB81]"></i>
                <h3 class="text-xl font-black uppercase">Fiat Card / Bank Wire</h3>
                <p class="text-xs text-gray-400">Direct instant deposit via Credit/Debit card or international wire transfer.</p>
                <button @click="handleFiatDepositPrompt" class="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10">DEPOSIT FIAD USD ➜</button>
              </div>
            </div>
          </div>

          <!-- Withdraw Tab -->
          <div v-if="activeTab === 'withdraw'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Withdrawal Method</label>
                  <select v-model="withdrawForm.method" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-bold text-xs uppercase outline-none focus:border-[#F0B90B]">
                    <option value="crypto_usdt">USDT (TRC20 / BEP20 Crypto)</option>
                    <option value="crypto_btc">Bitcoin (BTC Chain)</option>
                    <option value="bank">Direct Bank Wire (IBAN)</option>
                  </select>
                </div>

                <div>
                  <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Amount (USD)</label>
                  <div class="relative">
                    <input v-model.number="withdrawForm.amount" type="number" min="50" placeholder="0.00" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-[#F0B90B] text-xl text-white">
                    <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[#F0B90B] font-black">$</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Destination Address / Account</label>
                  <input v-model="withdrawForm.destination" type="text" placeholder="Enter Wallet Address or IBAN..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-mono text-xs outline-none focus:border-[#F0B90B]">
                </div>

                <div class="p-4 bg-black/50 rounded-2xl border border-white/5 text-[10px] space-y-1 font-mono">
                  <div class="flex justify-between text-gray-400"><span>Network Fee:</span><span class="text-white">$1.00 USDT</span></div>
                  <div class="flex justify-between text-gray-400"><span>Security Status:</span><span class="text-[#0ECB81]">2FA Protected</span></div>
                </div>
              </div>
            </div>

            <button @click="initiateWithdrawal" class="btn-primary w-full py-5 text-xs uppercase tracking-[0.3em] mt-4">
              PROCEED WITHDRAWAL & VERIFY 2FA
            </button>
          </div>

          <!-- Instant Swap Tab -->
          <div v-if="activeTab === 'swap'" class="space-y-6 max-w-lg mx-auto text-center">
            <h3 class="text-xl font-black uppercase">Zero-Fee Instant Crypto Swap</h3>
            <div class="bg-black/50 p-6 rounded-3xl border border-white/10 space-y-4">
              <div class="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                <input v-model.number="swapFromAmount" type="number" class="bg-transparent text-2xl font-black font-mono outline-none w-1/2 text-white" placeholder="0">
                <span class="font-black text-sm text-[#F0B90B]">USD / USDT</span>
              </div>
              <div class="text-xl text-[#F0B90B]">⬇️</div>
              <div class="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                <div class="text-2xl font-black font-mono text-[#0ECB81]">{{ (swapFromAmount * 0.8).toFixed(2) }}</div>
                <span class="font-black text-sm text-[#0ECB81]">NEX TOKENS</span>
              </div>
            </div>
            <button @click="executeSwap" class="btn-primary w-full py-4 text-xs uppercase tracking-widest">SWAP INSTANTLY ➜</button>
          </div>
        </div>
      </div>

      <!-- Transaction History & SAFU Security Card -->
      <div class="space-y-6">
        <div class="glass p-8 rounded-[35px] border-white/10 shadow-2xl bg-[#161618]">
          <h3 class="text-xl font-black uppercase mb-6 font-outfit">Blockchain Logs</h3>
          <div class="space-y-4">
            <div v-for="tx in transactions" :key="tx.id" class="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs font-mono">
              <div class="flex justify-between items-center mb-1">
                <span class="font-black uppercase text-white">{{ tx.type }}</span>
                <span :class="tx.amount > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="font-bold">
                  {{ tx.amount > 0 ? '+' : '' }}${{ Math.abs(tx.amount).toFixed(2) }}
                </span>
              </div>
              <div class="text-[9px] text-gray-500 truncate">TxHash: {{ tx.hash }}</div>
            </div>
          </div>
        </div>

        <div class="glass p-6 rounded-[30px] border-[#0ECB81]/30 bg-gradient-to-br from-[#0ECB81]/10 to-[#0B0E11] text-center space-y-2">
          <i class="fa-solid fa-shield-halved text-3xl text-[#0ECB81]"></i>
          <div class="text-xs font-black text-[#0ECB81] uppercase tracking-widest">Binance SAFU Reserve Guarantee</div>
          <p class="text-[10px] text-gray-400">All user funds are held 1:1 in cold storage vaults backed by our $1.2B insurance reserve fund.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CryptoDepositModal from '../components/CryptoDepositModal.vue'
import TwoFactorAuthModal from '../components/TwoFactorAuthModal.vue'

const props = defineProps({
  balance: Number,
  cryptoBalance: Number
})

const emit = defineEmits(['balance-update'])

const Swal = window.Swal || alert

const activeTab = ref('deposit')
const showDepositModal = ref(false)
const show2faModal = ref(false)
const swapFromAmount = ref(100)

const withdrawForm = reactive({
  method: 'crypto_usdt',
  amount: 100,
  destination: ''
})

const transactions = ref([
  { id: 1, type: 'Deposit USDT', amount: 500.00, hash: '0x7a8f9b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a' },
  { id: 2, type: 'Roulette Win', amount: 250.00, hash: '0x3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a7a8f9b2c' },
  { id: 3, type: 'Withdrawal USDT', amount: -200.00, hash: '0x1b2c3d4e5f6a7a8f9b2c3d4e5f6a1b2c3d4e5f6a' }
])

const handleFiatDepositPrompt = () => {
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'FIAT CARD DEPOSIT',
      text: 'Enter deposit amount in USD:',
      input: 'number',
      inputValue: 100,
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed && res.value > 0) {
        emit('balance-update', props.balance + parseFloat(res.value))
        window.Swal.fire({ title: 'DEPOSIT SUCCESSFUL', text: `$${res.value} added to balance!`, icon: 'success', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
      }
    })
  }
}

const initiateWithdrawal = () => {
  if (!withdrawForm.amount || withdrawForm.amount < 50) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Minimum withdrawal is $50', icon: 'error', background: '#0B0E11', color: '#fff' })
    return
  }
  if (withdrawForm.amount > props.balance) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Insufficient balance', icon: 'error', background: '#0B0E11', color: '#fff' })
    return
  }
  if (!withdrawForm.destination) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Please enter wallet address or bank account', icon: 'error', background: '#0B0E11', color: '#fff' })
    return
  }
  show2faModal.value = true
}

const executeWithdrawal = (pin) => {
  show2faModal.value = false
  const txHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')
  const newBalance = props.balance - withdrawForm.amount
  emit('balance-update', newBalance)

  transactions.value.unshift({
    id: Date.now(),
    type: `Withdrawal ${withdrawForm.method.toUpperCase()}`,
    amount: -withdrawForm.amount,
    hash: txHash
  })

  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'WITHDRAWAL BROADCASTED',
      html: `<div class="text-left space-y-2 text-xs font-mono"><p>Status: <span class="text-[#0ECB81]">Processing (0/12 Confirmations)</span></p><p>TxHash: <span class="text-[#F0B90B]">${txHash}</span></p></div>`,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}

const executeSwap = () => {
  if (swapFromAmount.value <= 0 || swapFromAmount.value > props.balance) return
  const tokensAdded = swapFromAmount.value * 0.8
  emit('balance-update', props.balance - swapFromAmount.value)
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'SWAP COMPLETED!',
      text: `Swapped $${swapFromAmount.value} USD for ${tokensAdded.toFixed(0)} NexTokens with zero fees!`,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}
</script>
