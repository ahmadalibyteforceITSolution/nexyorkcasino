<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000">
    <header class="mb-16 text-center">
      <h1 class="text-6xl font-black font-outfit uppercase tracking-tighter">FINANCE <span class="text-gradient">HUB</span></h1>
      <p class="text-gray-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Manage assets, deposit funds, and extract winnings</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
      <!-- Balance Cards -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass p-10 rounded-[50px] border-primary/20 shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-10 opacity-5">
            <div class="text-9xl text-primary font-bold">$</div>
          </div>
          <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Available Balance</div>
          <div class="text-5xl font-black text-white mb-2">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
          <div class="text-[10px] text-green-500 font-black uppercase tracking-widest">Verified & Secure</div>
        </div>
        <div class="glass p-10 rounded-[50px] border-orange-500/20 shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-10 opacity-5">
            <div class="text-9xl text-orange-500 font-bold">₿</div>
          </div>
          <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Crypto Portfolio</div>
          <div class="text-5xl font-black text-white mb-2">{{ cryptoBalance.toFixed(4) }} BTC</div>
          <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest">≈ ${{ (cryptoBalance * 64200).toLocaleString() }} USD</div>
        </div>

        <!-- Transaction Form (Deposit / Withdraw) -->
        <div class="md:col-span-2 glass p-12 rounded-[50px] border-white/5 shadow-2xl relative">
          <!-- Tabs -->
          <div class="flex gap-4 mb-8">
            <button @click="activeTab = 'deposit'" :class="activeTab === 'deposit' ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'" class="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all">Deposit</button>
            <button @click="activeTab = 'withdraw'" :class="activeTab === 'withdraw' ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'" class="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all">Withdraw</button>
          </div>

          <h2 class="text-2xl font-black mb-8 uppercase font-outfit">{{ activeTab === 'deposit' ? 'Add Money to Wallet' : 'Extract Winnings' }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div>
                <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Amount (USD)</label>
                <div class="relative">
                  <input v-model="form.amount" type="number" placeholder="0.00" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-xl">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-primary font-black">$</span>
                </div>
              </div>
              <div>
                <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">{{ activeTab === 'deposit' ? 'Payment Method' : 'Destination' }}</label>
                <select v-model="form.method" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-xs uppercase tracking-widest">
                  <option value="bank">Bank Wire</option>
                  <option value="crypto">Crypto Wallet</option>
                  <option v-if="activeTab === 'deposit'" value="card">Credit / Debit Card</option>
                </select>
              </div>
            </div>

            <!-- Card Details for Deposit -->
            <div v-if="activeTab === 'deposit' && form.method === 'card'" class="space-y-6 animate-in slide-in-from-right-10 duration-500">
              <div>
                <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Card Details</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center tracking-widest">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center">
                <input type="text" placeholder="CVV" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center">
              </div>
            </div>

            <!-- Destination Details for Withdrawal -->
            <div v-if="activeTab === 'withdraw'" class="space-y-6 animate-in slide-in-from-right-10 duration-500">
              <div>
                <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Account Holder Name</label>
                <input v-model="form.accountName" type="text" placeholder="JOHN DOE" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center tracking-widest text-xs uppercase">
              </div>
              <div>
                <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">{{ form.method === 'bank' ? 'Bank Account / IBAN' : 'Wallet Address' }}</label>
                <input v-model="form.accountNumber" type="text" :placeholder="form.method === 'bank' ? 'US12 3456 ...' : '0x...'" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center tracking-widest text-xs">
              </div>
            </div>
          </div>
          
          <button @click="handleSubmit" :disabled="loading" class="btn-primary w-full py-6 mt-12 text-sm uppercase tracking-[0.3em] disabled:opacity-50">
            {{ loading ? 'PROCESSING...' : (activeTab === 'deposit' ? 'CONFIRM DEPOSIT' : 'REQUEST WITHDRAWAL') }}
          </button>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="glass p-10 rounded-[50px] border-white/5 shadow-2xl flex flex-col">
        <h3 class="text-xl font-black mb-8 uppercase font-outfit">History</h3>
        <div class="flex-1 space-y-4">
          <div v-for="t in mockTransactions" :key="t.id" class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">{{ t.icon }}</div>
              <div>
                <div class="text-[10px] font-black uppercase tracking-tight">{{ t.type }}</div>
                <div class="text-[8px] text-gray-500 font-bold uppercase">{{ t.date }}</div>
              </div>
            </div>
            <div class="text-sm font-black" :class="t.amount > 0 ? 'text-green-500' : 'text-red-500'">
              {{ t.amount > 0 ? '+' : '' }}${{ Math.abs(t.amount).toLocaleString() }}
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-white/5">
          <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center">Transactions Secured by NexYork Shield</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const props = defineProps({
  balance: Number,
  cryptoBalance: Number
})

const emit = defineEmits(['balance-update'])

const Swal = window.Swal || alert

const activeTab = ref('deposit')
const loading = ref(false)
const form = reactive({
  amount: '',
  method: 'bank',
  accountName: '',
  accountNumber: ''
})

const mockTransactions = [
  { id: 1, type: 'Deposit', amount: 500, date: 'MAY 04, 11:20 AM', icon: '💰' },
  { id: 2, type: 'Bet Won', amount: 1200, date: 'MAY 04, 09:15 AM', icon: '🏆' },
  { id: 3, type: 'Withdrawal', amount: -2000, date: 'MAY 03, 04:45 PM', icon: '🏦' }
]

const showError = (msg) => {
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({ title: 'Error', text: msg, icon: 'error', background: '#111', color: '#fff', confirmButtonColor: '#F5C518' })
  } else {
    alert(msg)
  }
}

const handleSubmit = async () => {
  if (!form.amount || form.amount <= 0) return showError('Enter a valid amount')
  
  if (activeTab.value === 'withdraw') {
    if (form.amount > props.balance) return showError('Insufficient balance.')
    if (!form.accountName.trim() || !form.accountNumber.trim()) {
      return showError('Account Name and Account Number are required for withdrawals.')
    }
    if (!/^[A-Z0-9]{8,20}$/i.test(form.accountNumber.trim())) {
      return showError('Invalid Account Number format. Must be 8-20 alphanumeric characters (No spaces or dashes).')
    }
  } else {
    // Deposit flow - ask for Credit Card
    const { value: cardInfo } = await window.Swal.fire({
      title: 'Secure Deposit checkout',
      html: `
        <div style="text-align: left;">
          <p style="color:#aaa; font-size:12px; margin-bottom: 10px;">Amount to deposit: $${form.amount}</p>
          <input id="swal-cc-name" class="swal2-input" placeholder="Cardholder Name" style="width: 80%; background: #222; color: #fff; border: 1px solid #444;">
          <input id="swal-cc-num" class="swal2-input" placeholder="Card Number (16 digits)" maxlength="16" style="width: 80%; background: #222; color: #fff; border: 1px solid #444;">
        </div>
      `,
      background: '#0d0d0d',
      color: '#fff',
      confirmButtonColor: '#F5C518',
      confirmButtonText: 'Authorize Payment',
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById('swal-cc-name').value
        const num = document.getElementById('swal-cc-num').value
        if (!name || num.length < 16) {
          window.Swal.showValidationMessage('Valid Cardholder Name and 16-digit Card Number required')
        }
        return { name, num }
      }
    })
    
    if (!cardInfo) return // User cancelled
  }
  
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const endpoint = activeTab.value === 'deposit' ? '/api/deposit' : '/api/withdraw'
    
    const res = await axios.post(`http://localhost:5000${endpoint}`, form, {
      headers: { 'x-auth-token': token }
    })
    
    // Update local user data
    const user = JSON.parse(localStorage.getItem('user'))
    user.balance = res.data.balance
    localStorage.setItem('user', JSON.stringify(user))
    
    emit('balance-update', res.data.balance)
    
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({
        title: 'Success!',
        text: `${activeTab.value === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`,
        icon: 'success',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#F5C518'
      })
    } else {
      alert(`${activeTab.value === 'deposit' ? 'Deposit' : 'Withdrawal'} Successful! Your balance has been updated.`)
    }
    
    form.amount = ''
    form.accountName = ''
    form.accountNumber = ''
  } catch (err) {
    showError(err.response?.data?.error || 'Transaction failed')
  } finally {
    loading.value = false
  }
}
</script>
