// ==================== SETUP ====================
const CONTRACT_ADDRESS = "0x93796012ae35e91e946b3b016f5218191a021557";
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

const GAS_LIMIT_MULTIPLIER = 1.5;
const DEFAULT_GAS_LIMIT = 1000000;

// ==================== ABI ====================
const USDT_ABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "spender", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "owner", "type": "address" },
            { "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "to", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }
];

const CONTRACT_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "REGISTRATION_FEE",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "MAX_WITHDRAWAL",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalRegistrations",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalActiveUsers",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalPoolBalance",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "user", "type": "address" }],
        "name": "getUserInfo",
        "outputs": [
            { "name": "joinTime", "type": "uint256" },
            { "name": "totalWithdrawn", "type": "uint256" },
            { "name": "lastWithdrawMonth", "type": "uint256" },
            { "name": "referrer", "type": "address" },
            { "name": "registered", "type": "bool" },
            { "name": "isActive", "type": "bool" },
            { "name": "withdrawnThisMonth", "type": "bool" }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPoolInfo",
        "outputs": [
            { "name": "totalUsers", "type": "uint256" },
            { "name": "balance", "type": "uint256" },
            { "name": "currentMonth", "type": "uint256" },
            { "name": "monthInitialized", "type": "bool" },
            { "name": "sharePerUser", "type": "uint256" },
            { "name": "totalRegs", "type": "uint256" },
            { "name": "maxRegs", "type": "uint256" }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "user", "type": "address" }],
        "name": "getRemainingWithdrawal",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{ "name": "_referrer", "type": "address" }],
        "name": "register",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{ "name": "amount", "type": "uint256" }],
        "name": "depositToPool",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "cancel",
        "outputs": [],
        "type": "function"
    }
];

// ==================== GLOBAL VARIABLES ====================
let web3;
let contract;
let usdtContract;
let userAddress;
let refreshInterval;
let isProcessing = false;

// ==================== HELPER FUNCTIONS ====================
function showAlert(message, type = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert ${type}`;
    alertDiv.innerHTML = message;
    const container = document.getElementById("alertContainer");
    container.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

function formatUSDT(amount) {
    if (!amount && amount !== 0) return "-";
    return (Number(amount) / 1e6).toFixed(2) + " USDT";
}

function formatAddress(addr) {
    if (!addr || addr === "0x0000000000000000000000000000000000000000") return "-";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function setDepositAmount(amount) {
    document.getElementById("depositAmount").value = amount;
}

async function estimateGasWithBuffer(method, from, params = []) {
    try {
        let estimatedGas;
        if (params.length > 0) {
            estimatedGas = await method(...params).estimateGas({ from });
        } else {
            estimatedGas = await method().estimateGas({ from });
        }
        const gasWithBuffer = Math.floor(estimatedGas * GAS_LIMIT_MULTIPLIER);
        const finalGas = Math.min(gasWithBuffer, DEFAULT_GAS_LIMIT * 2);
        console.log(`Gas تخمینی: ${estimatedGas}, با بافر: ${finalGas}`);
        return finalGas;
    } catch (error) {
        console.warn("خطا در تخمین Gas:", error);
        return DEFAULT_GAS_LIMIT;
    }
}

// ==================== LOAD DATA ====================
async function loadPoolInfo() {
    if (!contract) return;
    try {
        const poolInfo = await contract.methods.getPoolInfo().call();
        document.getElementById("totalUsers").innerText = poolInfo[0].toString();
        document.getElementById("poolBalance").innerHTML = formatUSDT(poolInfo[1]);
        document.getElementById("currentMonth").innerText = poolInfo[2].toString();
        document.getElementById("monthStatus").innerHTML = poolInfo[3] ? "✅ فعال" : "⏳ غیرفعال";
        document.getElementById("sharePerUser").innerHTML = formatUSDT(poolInfo[4]);
        document.getElementById("totalRegs").innerText = poolInfo[5].toString();
        console.log("اطلاعات استخر بارگذاری شد");
    } catch (error) {
        console.error("خطا در بارگذاری استخر:", error);
    }
}

async function loadUserInfo() {
    if (!contract || !userAddress) return;
    try {
        const userInfo = await contract.methods.getUserInfo(userAddress).call();
        const remaining = await contract.methods.getRemainingWithdrawal(userAddress).call();
        
        const joinTime = new Date(Number(userInfo[0]) * 1000).toLocaleDateString("fa-IR");
        const isRegistered = userInfo[4];
        
        if (!isRegistered) {
            document.getElementById("userInfoSection").innerHTML = `
                <div class="info-box" style="background: #fff8e1;">
                    <p>❌ <strong>شما هنوز ثبت‌نام نکرده‌اید</strong></p>
                    <p>برای برداشت سود، ابتدا باید ثبت‌نام کنید (1 USDT)</p>
                    <p style="margin-top: 10px;">🔹 <strong>مراحل:</strong></p>
                    <p>1. ثبت‌نام با 1 USDT</p>
                    <p>2. منتظر فعال‌سازی ماه توسط مدیر باشید</p>
                    <p>3. سود خود را برداشت کنید</p>
                    <p style="margin-top: 10px;">💡 <strong>نکته:</strong> حتی بدون ثبت‌نام می‌توانید به استخر واریز کنید!</p>
                </div>
            `;
            return;
        }
        
        document.getElementById("userInfoSection").innerHTML = `
            <div class="user-details">
                <div class="detail-row">
                    <span class="detail-label">📅 تاریخ عضویت:</span>
                    <span class="detail-value">${joinTime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">💰 کل برداشت:</span>
                    <span class="detail-value">${formatUSDT(userInfo[1])}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📊 باقیمانده قابل برداشت:</span>
                    <span class="detail-value ${Number(remaining) > 0 ? 'positive' : ''}">${formatUSDT(remaining)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📆 آخرین ماه برداشت:</span>
                    <span class="detail-value">${userInfo[2] && userInfo[2] != 0 ? userInfo[2] : "هیچ"}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">👥 آدرس معرف:</span>
                    <span class="detail-value">${formatAddress(userInfo[3])}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">🔘 وضعیت:</span>
                    <span class="detail-value ${userInfo[5] ? 'positive' : ''}">${userInfo[5] ? "✅ فعال" : "❌ غیرفعال"}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">🔄 وضعیت برداشت این ماه:</span>
                    <span class="detail-value">${userInfo[6] ? "✅ انجام شده" : "⏳ انجام نشده"}</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("خطا در بارگذاری اطلاعات کاربر:", error);
    }
}

// ==================== CHECK ALLOWANCE ====================
async function checkAllowance() {
    if (!usdtContract || !userAddress) return 0;
    try {
        const allowance = await usdtContract.methods.allowance(userAddress, CONTRACT_ADDRESS).call();
        return allowance;
    } catch (error) {
        console.error("خطا در بررسی مجوز:", error);
        return 0;
    }
}

async function approveUSDT(amount) {
    if (!usdtContract || !userAddress) return false;
    try {
        showAlert("در حال تایید مجوز USDT... لطفاً تراکنش را تأیید کنید", "info");
        const gasLimit = await estimateGasWithBuffer(usdtContract.methods.approve, userAddress, [CONTRACT_ADDRESS, amount]);
        const tx = await usdtContract.methods.approve(CONTRACT_ADDRESS, amount).send({
            from: userAddress,
            gas: gasLimit
        });
        showAlert("✅ مجوز USDT با موفقیت تایید شد!", "success");
        return true;
    } catch (error) {
        console.error("خطا در تایید مجوز:", error);
        showAlert("❌ تایید مجوز ناموفق: " + error.message, "error");
        return false;
    }
}

// ==================== DEPOSIT TO POOL (برای همه کاربران) ====================
async function depositToPool() {
    if (!contract || !userAddress) {
        showAlert("لطفاً ابتدا کیف پول خود را متصل کنید", "error");
        return;
    }
    
    const amountInput = document.getElementById("depositAmount");
    const amountUSDT = parseFloat(amountInput.value);
    
    if (!amountUSDT || amountUSDT <= 0) {
        showAlert("لطفاً مبلغ معتبر وارد کنید", "error");
        return;
    }
    
    const amount = amountUSDT * 1e6;
    
    if (isProcessing) {
        showAlert("لطفاً صبر کنید، تراکنش قبلی در حال انجام است", "warning");
        return;
    }
    
    isProcessing = true;
    const depositBtn = document.getElementById("depositBtn");
    depositBtn.disabled = true;
    depositBtn.innerHTML = "<div class='loading'></div> در حال واریز...";
    
    try {
        const allowance = await checkAllowance();
        
        if (Number(allowance) < amount) {
            const approved = await approveUSDT(amount);
            if (!approved) {
                isProcessing = false;
                depositBtn.disabled = false;
                depositBtn.innerHTML = "💸 واریز به استخر";
                return;
            }
        }
        
        showAlert("در حال واریز به استخر... لطفاً تراکنش را تأیید کنید", "info");
        
        const gasLimit = await estimateGasWithBuffer(contract.methods.depositToPool, userAddress, [amount]);
        const tx = await contract.methods.depositToPool(amount).send({
            from: userAddress,
            gas: gasLimit
        });
        
        showAlert(`✅ واریز ${amountUSDT} USDT به استخر با موفقیت انجام شد! تراکنش: ${formatAddress(tx.transactionHash)}`, "success");
        amountInput.value = "";
        await loadPoolInfo();
        await loadUserInfo();
        
    } catch (error) {
        console.error("خطا در واریز:", error);
        if (error.message.includes("user rejected")) {
            showAlert("شما تراکنش را رد کردید", "warning");
        } else {
            showAlert("❌ واریز ناموفق: " + error.message.slice(0, 150), "error");
        }
    } finally {
        isProcessing = false;
        depositBtn.disabled = false;
        depositBtn.innerHTML = "💸 واریز به استخر";
    }
}

// ==================== REGISTER ====================
async function register() {
    if (!contract || !userAddress) {
        showAlert("لطفاً ابتدا کیف پول خود را متصل کنید", "error");
        return;
    }
    
    const referrer = document.getElementById("referrerAddress").value.trim();
    let referrerAddress = "0x0000000000000000000000000000000000000000";
    
    if (referrer && referrer !== "") {
        if (!web3.utils.isAddress(referrer)) {
            showAlert("آدرس معرف نامعتبر است", "error");
            return;
        }
        referrerAddress = referrer;
    }
    
    if (isProcessing) {
        showAlert("لطفاً صبر کنید، تراکنش قبلی در حال انجام است", "warning");
        return;
    }
    
    isProcessing = true;
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.disabled = true;
    registerBtn.innerHTML = "<div class='loading'></div> در حال ثبت‌نام...";
    
    try {
        const allowance = await checkAllowance();
        const fee = await contract.methods.REGISTRATION_FEE().call();
        
        if (Number(allowance) < Number(fee)) {
            const approved = await approveUSDT(fee);
            if (!approved) {
                isProcessing = false;
                registerBtn.disabled = false;
                registerBtn.innerHTML = "✅ ثبت‌نام (1 USDT)";
                return;
            }
        }
        
        showAlert("در حال ثبت‌نام... لطفاً تراکنش را تأیید کنید", "info");
        
        const gasLimit = await estimateGasWithBuffer(contract.methods.register, userAddress, [referrerAddress]);
        const tx = await contract.methods.register(referrerAddress).send({
            from: userAddress,
            gas: gasLimit
        });
        
        showAlert("✅ ثبت‌نام با موفقیت انجام شد! تراکنش: " + formatAddress(tx.transactionHash), "success");
        document.getElementById("referrerAddress").value = "";
        await loadUserInfo();
        await loadPoolInfo();
        
    } catch (error) {
        console.error("خطا در ثبت‌نام:", error);
        if (error.message.includes("user rejected")) {
            showAlert("شما تراکنش را رد کردید", "warning");
        } else if (error.message.includes("Max regs")) {
            showAlert("❌ حداکثر ثبت‌نام به پایان رسیده است", "error");
        } else if (error.message.includes("Registered")) {
            showAlert("❌ شما قبلاً ثبت‌نام کرده‌اید", "error");
        } else {
            showAlert("❌ ثبت‌نام ناموفق: " + error.message.slice(0, 150), "error");
        }
    } finally {
        isProcessing = false;
        registerBtn.disabled = false;
        registerBtn.innerHTML = "✅ ثبت‌نام (1 USDT)";
    }
}

// ==================== WITHDRAW ====================
async function withdraw() {
    if (!contract || !userAddress) {
        showAlert("لطفاً ابتدا کیف پول خود را متصل کنید", "error");
        return;
    }
    
    if (isProcessing) {
        showAlert("لطفاً صبر کنید، تراکنش قبلی در حال انجام است", "warning");
        return;
    }
    
    isProcessing = true;
    const withdrawBtn = document.getElementById("withdrawBtn");
    withdrawBtn.disabled = true;
    withdrawBtn.innerHTML = "<div class='loading'></div> در حال برداشت...";
    
    try {
        showAlert("در حال برداشت سود... لطفاً تراکنش را تأیید کنید", "info");
        
        const gasLimit = await estimateGasWithBuffer(contract.methods.withdraw, userAddress, []);
        const tx = await contract.methods.withdraw().send({
            from: userAddress,
            gas: gasLimit
        });
        
        showAlert("✅ برداشت با موفقیت انجام شد! تراکنش: " + formatAddress(tx.transactionHash), "success");
        await loadUserInfo();
        await loadPoolInfo();
        
    } catch (error) {
        console.error("خطا در برداشت:", error);
        if (error.message.includes("user rejected")) {
            showAlert("شما تراکنش را رد کردید", "warning");
        } else if (error.message.includes("Month not init")) {
            showAlert("❌ ماه جاری هنوز فعال نشده است. منتظر بمانید", "warning");
        } else if (error.message.includes("Already withdrawn")) {
            showAlert("❌ شما قبلاً در این ماه برداشت کرده‌اید", "warning");
        } else if (error.message.includes("Not active")) {
            showAlert("❌ حساب شما فعال نیست", "error");
        } else if (error.message.includes("registered")) {
            showAlert("❌ ابتدا باید ثبت‌نام کنید", "error");
        } else {
            showAlert("❌ برداشت ناموفق: " + error.message.slice(0, 150), "error");
        }
    } finally {
        isProcessing = false;
        withdrawBtn.disabled = false;
        withdrawBtn.innerHTML = "💸 برداشت سود ماهانه";
    }
}

// ==================== CANCEL ====================
async function cancel() {
    if (!contract || !userAddress) {
        showAlert("لطفاً ابتدا کیف پول خود را متصل کنید", "error");
        return;
    }
    
    if (isProcessing) {
        showAlert("لطفاً صبر کنید، تراکنش قبلی در حال انجام است", "warning");
        return;
    }
    
    if (!confirm("⚠️ هشدار: آیا از انصراف از طرح اطمینان دارید؟\n\nپس از انصراف:\n• دیگر سود دریافت نمی‌کنید\n• هزینه ثبت‌نام بازگردانده نمی‌شود\n• امکان ثبت‌نام مجدد وجود ندارد\n\nآیا مطمئن هستید؟")) {
        return;
    }
    
    isProcessing = true;
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.disabled = true;
    cancelBtn.innerHTML = "<div class='loading'></div> در حال انصراف...";
    
    try {
        showAlert("در حال انصراف... لطفاً تراکنش را تأیید کنید", "info");
        
        const gasLimit = await estimateGasWithBuffer(contract.methods.cancel, userAddress, []);
        const tx = await contract.methods.cancel().send({
            from: userAddress,
            gas: gasLimit
        });
        
        showAlert("✅ انصراف با موفقیت انجام شد!", "success");
        await loadUserInfo();
        await loadPoolInfo();
        
    } catch (error) {
        console.error("خطا در انصراف:", error);
        if (error.message.includes("user rejected")) {
            showAlert("شما تراکنش را رد کردید", "warning");
        } else {
            showAlert("❌ انصراف ناموفق: " + error.message.slice(0, 150), "error");
        }
    } finally {
        isProcessing = false;
        cancelBtn.disabled = false;
        cancelBtn.innerHTML = "❌ انصراف از طرح";
    }
}

// ==================== CONNECT WALLET ====================
async function switchToPolygon() {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }]
        });
        return true;
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x89",
                        chainName: "Polygon Mainnet",
                        nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                        rpcUrls: ["https://polygon-rpc.com"],
                        blockExplorerUrls: ["https://polygonscan.com"]
                    }]
                });
                return true;
            } catch (addError) {
                console.error("خطا در افزودن شبکه:", addError);
                return false;
            }
        }
        return false;
    }
}

async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
        showAlert("لطفاً متاماسک را نصب کنید!", "error");
        window.open("https://metamask.io/download/", "_blank");
        return;
    }
    
    const connectBtn = document.getElementById("connectBtn");
    connectBtn.disabled = true;
    connectBtn.innerHTML = "<div class='loading'></div> در حال اتصال...";
    
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x89") {
            showAlert("لطفاً به شبکه پالیگان سوئیچ کنید", "info");
            const switched = await switchToPolygon();
            if (!switched) {
                showAlert("لطفاً به صورت دستی به شبکه پالیگان سوئیچ کنید", "warning");
                connectBtn.disabled = false;
                connectBtn.innerHTML = "🔗 اتصال کیف پول";
                return;
            }
        }
        
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        usdtContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
        
        document.getElementById("statusText").innerHTML = `✅ متصل | ${formatAddress(userAddress)}`;
        document.getElementById("mainContent").style.display = "block";
        connectBtn.style.display = "none";
        
        const usdtBalance = await usdtContract.methods.balanceOf(userAddress).call();
        if (Number(usdtBalance) < 1e6) {
            showAlert("⚠️ موجودی USDT شما کمتر از 1 است", "warning");
        }
        
        await loadPoolInfo();
        await loadUserInfo();
        
        if (refreshInterval) clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            if (userAddress) {
                loadPoolInfo();
                loadUserInfo();
            }
        }, 30000);
        
    } catch (error) {
        console.error("خطا در اتصال:", error);
        showAlert("خطا در اتصال به کیف پول: " + error.message, "error");
        connectBtn.disabled = false;
        connectBtn.innerHTML = "🔗 اتصال کیف پول";
    }
}

// ==================== EVENT LISTENERS ====================
if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
            window.location.reload();
        } else {
            userAddress = accounts[0];
            document.getElementById("statusText").innerHTML = `✅ متصل | ${formatAddress(userAddress)}`;
            loadUserInfo();
            loadPoolInfo();
        }
    });
    
    window.ethereum.on("chainChanged", () => {
        window.location.reload();
    });
}

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("depositBtn").onclick = depositToPool;
document.getElementById("registerBtn").onclick = register;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("cancelBtn").onclick = cancel;

console.log("✅ DApp بارگذاری شد");
console.log("📞 آدرس قرارداد:", CONTRACT_ADDRESS);
console.log("💰 آدرس USDT:", USDT_ADDRESS);
