<template>
  <div class="pt-28 pb-20 container mx-auto px-4 font-outfit max-w-7xl animate-in fade-in duration-700">
    <header class="mb-12 text-center relative">
      <div class="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-black text-[#FF7A00] tracking-widest uppercase mb-4 shadow-xs">
        <i class="fa-solid fa-vault"></i>
        BINANCE MULTI-ASSET FINANCIAL VAULT
      </div>
      <h1 class="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#1A202C]">
        WALLET & <span class="text-gradient">EXCHANGE</span>
      </h1>
      <p class="text-[#5A6474] text-xs md:text-sm uppercase tracking-[0.3em] mt-3">Deposit crypto, withdraw earnings, and swap tokens instantly</p>
    </header>

    <CryptoDepositModal v-if="showDepositModal" @close="showDepositModal = false" />
    <TwoFactorAuthModal v-if="show2faModal" @close="show2faModal = false" @verified="executeWithdrawal" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <!-- Balance Cards -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- USD Balance -->
        <div class="p-8 rounded-[35px] border border-orange-200 shadow-md relative overflow-hidden bg-gradient-to-br from-white via-[#FFF9F3] to-orange-50 group">
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <div class="text-9xl text-[#FF7A00] font-black">$</div>
          </div>
          <div class="text-xs font-black text-[#718096] uppercase tracking-widest mb-2">Available USD Balance</div>
          <div class="text-4xl md:text-5xl font-black text-[#1A202C] mb-2 font-mono">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-[#EFE8DF] text-xs">
            <span class="text-emerald-700 font-black uppercase tracking-wider">Verified & SAFU Secured</span>
            <button @click="showDepositModal = true" class="text-[#FF7A00] font-black uppercase hover:underline cursor-pointer">Deposit Crypto ➜</button>
          </div>
        </div>

        <!-- Crypto Portfolio -->
        <div class="p-8 rounded-[35px] border border-orange-200 shadow-md relative overflow-hidden bg-gradient-to-br from-white via-[#FFF9F3] to-amber-50 group">
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <div class="text-9xl text-amber-500 font-black">₿</div>
          </div>
          <div class="text-xs font-black text-[#718096] uppercase tracking-widest mb-2">Crypto Portfolio</div>
          <div class="text-4xl md:text-5xl font-black text-[#1A202C] mb-2 font-mono">{{ cryptoBalance.toFixed(4) }} BTC</div>
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-[#EFE8DF] text-xs">
            <span class="text-[#718096] font-bold">≈ ${{ (cryptoBalance * 67420).toLocaleString() }} USD</span>
            <button @click="activeTab = 'swap'" class="text-[#FF7A00] font-black uppercase hover:underline cursor-pointer">Instant Swap ➜</button>
          </div>
        </div>

        <!-- Main Action Tabs Form -->
        <div class="md:col-span-2 p-8 md:p-10 rounded-[40px] border border-[#E2D9CE] shadow-lg bg-white">
          <!-- Tabs Navigation -->
          <div class="flex gap-3 mb-8 border-b border-[#EFE8DF] pb-4 flex-wrap">
            <button @click="activeTab = 'deposit'" :class="activeTab === 'deposit' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black shadow-xs' : 'bg-[#FAF8F5] text-[#5A6474] hover:text-[#1A202C] border border-[#E2D9CE]'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer font-black">
              <i class="fa-solid fa-arrow-down-left mr-1"></i> Deposit
            </button>
            <button @click="activeTab = 'withdraw'" :class="activeTab === 'withdraw' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black shadow-xs' : 'bg-[#FAF8F5] text-[#5A6474] hover:text-[#1A202C] border border-[#E2D9CE]'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer font-black">
              <i class="fa-solid fa-arrow-up-right mr-1"></i> Withdraw
            </button>
            <button @click="activeTab = 'swap'" :class="activeTab === 'swap' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black shadow-xs' : 'bg-[#FAF8F5] text-[#5A6474] hover:text-[#1A202C] border border-[#E2D9CE]'" class="px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer font-black">
              <i class="fa-solid fa-right-left mr-1"></i> Instant Swap
            </button>
          </div>

          <!-- Deposit Tab -->
          <div v-if="activeTab === 'deposit'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-[#FAF8F5] rounded-3xl border border-[#EAE2D7] text-center space-y-4 shadow-2xs">
                <i class="fa-brands fa-bitcoin text-4xl text-[#FF7A00]"></i>
                <h3 class="text-xl font-black uppercase text-[#1A202C]">Crypto Deposit</h3>
                <p class="text-xs text-[#5A6474]">Deposit BTC, ETH, USDT (TRC20/ERC20/BEP20) or SOL with instant confirmation.</p>
                <button @click="showDepositModal = true" class="btn-primary w-full py-3.5 text-xs uppercase tracking-widest cursor-pointer">GENERATE DEPOSIT QR ➜</button>
              </div>

              <div class="p-6 bg-[#FAF8F5] rounded-3xl border border-[#EAE2D7] text-center space-y-4 shadow-2xs">
                <i class="fa-solid fa-credit-card text-4xl text-emerald-600"></i>
                <h3 class="text-xl font-black uppercase text-[#1A202C]">Fiat Card / Wire</h3>
                <p class="text-xs text-[#5A6474]">Direct instant deposit via Credit/Debit card or international wire transfer.</p>
                <button @click="handleFiatDepositPrompt" class="w-full py-3.5 bg-white hover:bg-orange-50 text-[#1A202C] font-black text-xs uppercase tracking-widest rounded-2xl border border-[#E2D9CE] cursor-pointer">DEPOSIT FIAT USD ➜</button>
              </div>
            </div>
          </div>

          <!-- Withdraw Tab -->
          <div v-if="activeTab === 'withdraw'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Withdrawal Method</label>
                  <select v-model="withdrawForm.method" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-bold text-xs uppercase outline-none focus:border-[#FF7A00] text-[#1A202C]">
                    <option value="crypto_usdt">USDT (TRC20 / BEP20 Crypto)</option>
                    <option value="crypto_btc">Bitcoin (BTC Chain)</option>
                    <option value="bank">Direct Bank Wire (IBAN)</option>
                  </select>
                </div>

                <div>
                  <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Amount (USD)</label>
                  <div class="relative">
                    <input v-model.number="withdrawForm.amount" type="number" min="50" placeholder="0.00" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] text-xl text-[#1A202C]">
                    <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#FF7A00] font-black">$</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Destination Address / Account</label>
                  <input v-model="withdrawForm.destination" type="text" placeholder="Enter Wallet Address or IBAN..." class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-mono text-xs outline-none focus:border-[#FF7A00] text-[#1A202C]">
                </div>

                <div class="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 text-[10px] space-y-1 font-mono">
                  <div class="flex justify-between text-[#5A6474]"><span>Network Fee:</span><span class="text-[#1A202C] font-bold">$1.00 USDT</span></div>
                  <div class="flex justify-between text-[#5A6474]"><span>Security Status:</span><span class="text-emerald-700 font-bold">2FA Protected</span></div>
                </div>
              </div>
            </div>

            <button @click="initiateWithdrawal" class="btn-primary w-full py-4 text-xs uppercase tracking-[0.25em] mt-4 cursor-pointer">
              PROCEED WITHDRAWAL & VERIFY 2FA
            </button>
          </div>

          <!-- Instant Swap Tab -->
          <div v-if="activeTab === 'swap'" class="space-y-6 max-w-lg mx-auto text-center">
            <h3 class="text-xl font-black uppercase text-[#1A202C]">Zero-Fee Instant Crypto Swap</h3>
            <div class="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E2D9CE] space-y-4">
              <div class="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E2D9CE]">
                <input v-model.number="swapFromAmount" type="number" class="bg-transparent text-2xl font-black font-mono outline-none w-1/2 text-[#1A202C]" placeholder="0">
                <span class="font-black text-sm text-[#FF7A00]">USD / USDT</span>
              </div>
              <div class="text-xl text-[#FF7A00]">⬇️</div>
              <div class="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E2D9CE]">
                <div class="text-2xl font-black font-mono text-emerald-700">{{ (swapFromAmount * 0.8).toFixed(2) }}</div>
                <span class="font-black text-sm text-emerald-700">NEX TOKENS</span>
              </div>
            </div>
            <button @click="executeSwap" class="btn-primary w-full py-3.5 text-xs uppercase tracking-widest cursor-pointer">SWAP INSTANTLY ➜</button>
          </div>
        </div>
      </div>

      <!-- Transaction History & SAFU Security Card -->
      <div class="space-y-6">
        <div class="p-8 rounded-[35px] border border-[#E2D9CE] shadow-md bg-white">
          <h3 class="text-xl font-black uppercase mb-6 font-outfit text-[#1A202C]">Blockchain Logs</h3>
          <div class="space-y-3">
            <div v-for="tx in transactions" :key="tx.id" class="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE2D7] text-xs font-mono">
              <div class="flex justify-between items-center mb-1">
                <span class="font-black uppercase text-[#1A202C]">{{ tx.type }}</span>
                <span :class="tx.amount > 0 ? 'text-emerald-700' : 'text-rose-600'" class="font-black">
                  {{ tx.amount > 0 ? '+' : '' }}${{ Math.abs(tx.amount).toFixed(2) }}
                </span>
              </div>
              <div class="text-[9px] text-[#718096] truncate">TxHash: {{ tx.hash }}</div>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-[30px] border border-emerald-200 bg-emerald-50 text-center space-y-2 shadow-xs">
          <i class="fa-solid fa-shield-halved text-3xl text-emerald-600"></i>
          <div class="text-xs font-black text-emerald-800 uppercase tracking-widest">Binance SAFU Reserve Guarantee</div>
          <p class="text-[10px] text-[#5A6474]">All user funds are held 1:1 in cold storage vaults backed by our $1.2B insurance reserve fund.</p>
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
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed && res.value > 0) {
        emit('balance-update', props.balance + parseFloat(res.value))
        window.Swal.fire({ title: 'DEPOSIT SUCCESSFUL', text: `$${res.value} added to balance!`, icon: 'success', background: '#FFFFFF', color: '#1A202C', confirmButtonColor: '#FF7A00' })
      }
    })
  }
}

const initiateWithdrawal = () => {
  if (!withdrawForm.amount || withdrawForm.amount < 50) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Minimum withdrawal is $50', icon: 'error', background: '#FFFFFF', color: '#1A202C' })
    return
  }
  if (withdrawForm.amount > props.balance) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Insufficient balance', icon: 'error', background: '#FFFFFF', color: '#1A202C' })
    return
  }
  if (!withdrawForm.destination) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Please enter wallet address or bank account', icon: 'error', background: '#FFFFFF', color: '#1A202C' })
    return
  }
  show2faModal.value = true
}

const executeWithdrawal = () => {
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
      html: `<div class="text-left space-y-2 text-xs font-mono"><p>Status: <span class="text-[#00A86B]">Processing (0/12 Confirmations)</span></p><p>TxHash: <span class="text-[#FF7A00]">${txHash}</span></p></div>`,
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
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
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  }
}
</script>
