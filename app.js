// ==================== Contract Address ====================
const CONTRACT_ADDRESS = "0x475b8E322EC5BD5CedD800afED3f599E346caB32";
const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

// ==================== Contract ABIs ====================
const USDT_ABI = [
    {"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"type":"function"},
    {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"type":"function"},
    {"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},
    {"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}
];

const CONTRACT_ABI = [
    {"inputs":[{"internalType":"address","name":"_teamWallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositedToPool","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint8","name":"exitType","type":"uint8"}],"name":"ExitedPool","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"month","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sharePerUser","type":"uint256"}],"name":"MonthInitialized","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"}],"name":"Registered","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newWallet","type":"address"}],"name":"TeamWalletUpdated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"month","type":"uint256"}],"name":"Withdrawn","type":"event"},
    {"inputs":[],"name":"MAX_REGISTRATIONS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"MAX_WITHDRAWAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"REGISTRATION_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"USDT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"cancel","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositToPool","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"month","type":"uint256"}],"name":"getMonthInfo","outputs":[{"internalType":"bool","name":"initialized","type":"bool"},{"internalType":"uint256","name":"poolBalance","type":"uint256"},{"internalType":"uint256","name":"userCount","type":"uint256"},{"internalType":"uint256","name":"sharePerUser","type":"uint256"},{"internalType":"uint256","name":"snapshotTime","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"getPoolInfo","outputs":[{"internalType":"uint256","name":"totalUsers","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"currentMonth","type":"uint256"},{"internalType":"bool","name":"monthInitialized","type":"bool"},{"internalType":"uint256","name":"sharePerUser","type":"uint256"},{"internalType":"uint256","name":"totalRegs","type":"uint256"},{"internalType":"uint256","name":"maxRegs","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getRemainingWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"joinTime","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawn","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawMonth","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"withdrawnThisMonth","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"initializeMonth","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"isWithinDistributionWindow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"months","outputs":[{"internalType":"uint64","name":"poolBalance","type":"uint64"},{"internalType":"uint32","name":"userCount","type":"uint32"},{"internalType":"uint32","name":"sharePerUser","type":"uint32"},{"internalType":"uint32","name":"snapshotTime","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"_referrer","type":"address"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"removeFromPool","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"newWallet","type":"address"}],"name":"setTeamWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalActiveUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalPoolBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"totalRegistrations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint64","name":"joinTime","type":"uint64"},{"internalType":"uint64","name":"totalWithdrawn","type":"uint64"},{"internalType":"uint32","name":"lastWithdrawMonth","type":"uint32"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"withdrawnThisMonth","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

// ==================== Global Variables ====================
let web3;
let contract;
let usdtContract;
let userAddress;
let refreshInterval;
let isProcessing = false;
let currentLang = "fa";

// ==================== Translations ====================
const translations = {
    fa: {
        mainTitle: "مشارکت در سود ماهانه",
        mainSubtitle: "ثبت‌نام 105 USDT | حداکثر برداشت 300 USDT",
        connectText: "اتصال کیف پول",
        tabProfile: "پروفایل",
        tabDeposit: "واریز به استخر",
        tabRegister: "ثبت‌نام",
        tabWithdraw: "برداشت سود",
        tabCancel: "انصراف",
        profileTitle: "اطلاعات کاربری",
        depositTitle: "واریز به استخر",
        registerTitle: "ثبت‌نام در طرح",
        withdrawTitle: "برداشت سود",
        cancelTitle: "انصراف از طرح",
        poolBalanceLabel: "موجودی استخر",
        activeUsersLabel: "کاربران فعال",
        amountLabel: "مبلغ (USDT)",
        depositBtnText: "واریز به استخر",
        depositInfo: "هر کسی می‌تواند به استخر واریز کند. با واریز شما، سود همه کاربران افزایش می‌یابد.",
        referrerLabel: "آدرس معرف (اختیاری)",
        registerBtnText: "ثبت‌نام (105 USDT)",
        registerInfo: "ثبت‌نام فقط یکبار انجام می‌شود و برای برداشت سود الزامی است.",
        shareLabel: "سود این ماه",
        remainingLabel: "باقیمانده قابل برداشت",
        withdrawBtnText: "برداشت سود ماهانه",
        calcInfo: "سهم هر کاربر = موجودی استخر ÷ تعداد کاربران فعال",
        maxWithdrawInfo: "حداکثر برداشت کل: 300 USDT",
        cancelBtnText: "درخواست انصراف",
        cancelInfo: "پس از انصراف، دیگر سود ماهانه دریافت نمی‌کنید و هزینه ثبت‌نام بازگردانده نمی‌شود. درخواست انصراف توسط مدیر بررسی می‌شود و در صورت احراز شرایط، مابقی مبلغ به کیف پول شما واریز می‌گردد.",
        notRegistered: "شما ثبت‌نام نکرده‌اید",
        notRegisteredDesc: "برای برداشت سود، ابتدا ثبت‌نام کنید",
        feeLabel: "هزینه ثبت‌نام",
        joinDate: "تاریخ عضویت",
        totalWithdrawn: "کل برداشت",
        status: "وضعیت حساب",
        statusActive: "فعال",
        statusInactive: "غیرفعال",
        monthWithdrawn: "برداشت این ماه",
        monthDone: "انجام شده",
        monthNotDone: "انجام نشده"
    },
    en: {
        mainTitle: "Monthly Profit Sharing",
        mainSubtitle: "Registration 105 USDT | Max Withdrawal 300 USDT",
        connectText: "Connect Wallet",
        tabProfile: "Profile",
        tabDeposit: "Deposit",
        tabRegister: "Register",
        tabWithdraw: "Withdraw",
        tabCancel: "Cancel",
        profileTitle: "User Profile",
        depositTitle: "Deposit to Pool",
        registerTitle: "Register",
        withdrawTitle: "Withdraw Profit",
        cancelTitle: "Cancel Plan",
        poolBalanceLabel: "Pool Balance",
        activeUsersLabel: "Active Users",
        amountLabel: "Amount (USDT)",
        depositBtnText: "Deposit to Pool",
        depositInfo: "Anyone can deposit to the pool. Your deposit increases everyone's monthly profit.",
        referrerLabel: "Referrer Address (Optional)",
        registerBtnText: "Register (105 USDT)",
        registerInfo: "Registration is one-time only and required for profit withdrawal.",
        shareLabel: "This Month Share",
        remainingLabel: "Remaining Withdrawable",
        withdrawBtnText: "Withdraw Monthly Profit",
        calcInfo: "Share = Pool Balance ÷ Active Users",
        maxWithdrawInfo: "Max Total Withdrawal: 300 USDT",
        cancelBtnText: "Request Cancellation",
        cancelInfo: "After cancellation, you will no longer receive monthly profits and the registration fee will not be refunded. The cancellation request will be reviewed by the admin, and if eligible, the remaining amount will be sent to your wallet.",
        notRegistered: "Not Registered",
        notRegisteredDesc: "You need to register first to withdraw profits",
        feeLabel: "Registration Fee",
        joinDate: "Join Date",
        totalWithdrawn: "Total Withdrawn",
        status: "Account Status",
        statusActive: "Active",
        statusInactive: "Inactive",
        monthWithdrawn: "This Month",
        monthDone: "Done",
        monthNotDone: "Not Done"
    }
};

// ==================== Helper Functions ====================
function updateLanguage() {
    const t = translations[currentLang];
    
    document.getElementById("mainTitle").innerText = t.mainTitle;
    document.getElementById("mainSubtitle").innerText = t.mainSubtitle;
    document.getElementById("connectText").innerText = t.connectText;
    document.getElementById("profileTitle").innerText = t.profileTitle;
    document.getElementById("depositTitle").innerText = t.depositTitle;
    document.getElementById("registerTitle").innerText = t.registerTitle;
    document.getElementById("withdrawTitle").innerText = t.withdrawTitle;
    document.getElementById("cancelTitle").innerText = t.cancelTitle;
    document.getElementById("poolBalanceLabel").innerText = t.poolBalanceLabel;
    document.getElementById("activeUsersLabel").innerText = t.activeUsersLabel;
    document.getElementById("amountLabel").innerHTML = t.amountLabel;
    document.getElementById("depositBtnText").innerText = t.depositBtnText;
    document.getElementById("depositInfo").innerHTML = t.depositInfo;
    document.getElementById("referrerLabel").innerHTML = t.referrerLabel;
    document.getElementById("registerBtnText").innerText = t.registerBtnText;
    document.getElementById("registerInfo").innerHTML = t.registerInfo;
    document.getElementById("shareLabel").innerText = t.shareLabel;
    document.getElementById("remainingLabel").innerText = t.remainingLabel;
    document.getElementById("withdrawBtnText").innerText = t.withdrawBtnText;
    document.getElementById("calcInfo").innerText = t.calcInfo;
    document.getElementById("maxWithdrawInfo").innerText = t.maxWithdrawInfo;
    document.getElementById("cancelBtnText").innerText = t.cancelBtnText;
    document.getElementById("cancelInfo").innerHTML = t.cancelInfo;
    document.getElementById("feeLabel").innerText = t.feeLabel;
    
    // Update tab buttons
    document.querySelector(".tab-text-profile").innerText = t.tabProfile;
    document.querySelector(".tab-text-deposit").innerText = t.tabDeposit;
    document.querySelector(".tab-text-register").innerText = t.tabRegister;
    document.querySelector(".tab-text-withdraw").innerText = t.tabWithdraw;
    document.querySelector(".tab-text-cancel").innerText = t.tabCancel;
    
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
    if (currentLang === "fa") document.getElementById("langFa").classList.add("active");
    else document.getElementById("langEn").classList.add("active");
    
    document.body.setAttribute("dir", currentLang === "fa" ? "rtl" : "ltr");
    loadUserInfo();
}

function setLanguage(lang) {
    currentLang = lang;
    updateLanguage();
}

function showAlert(message, type = "info") {
    const container = document.getElementById("alertContainer");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert ${type}`;
    alertDiv.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i> ${message}`;
    container.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

function formatUSDT(amount) {
    if (!amount && amount !== 0) return "0 USDT";
    return (Number(amount) / 1e6).toFixed(2) + " USDT";
}

function formatAddress(addr) {
    if (!addr || addr === "0x0000000000000000000000000000000000000000") return "-";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// ==================== Load Data from Contract ====================
async function loadPoolInfo() {
    if (!contract) return;
    try {
        const poolInfo = await contract.methods.getPoolInfo().call();
        document.getElementById("poolBalance").innerHTML = formatUSDT(poolInfo[1]);
        document.getElementById("totalUsers").innerText = Number(poolInfo[0]).toLocaleString();
        document.getElementById("sharePerUser").innerHTML = formatUSDT(poolInfo[4]);
    } catch (error) {
        console.error("Error loading pool:", error);
    }
}

async function loadUserInfo() {
    if (!contract || !userAddress) return;
    try {
        const userInfo = await contract.methods.getUserInfo(userAddress).call();
        const remaining = await contract.methods.getRemainingWithdrawal(userAddress).call();
        
        document.getElementById("remainingWithdraw").innerHTML = formatUSDT(remaining);
        
        if (!userInfo[4]) {
            const t = translations[currentLang];
            document.getElementById("userInfoSection").innerHTML = `
                <div class="user-details" style="text-align: center; padding: 30px;">
                    <i class="fas fa-user-slash" style="font-size: 48px; color: #ef4444; margin-bottom: 16px; display: block;"></i>
                    <strong style="color: #f1f5f9;">${t.notRegistered}</strong>
                    <p style="color: #94a3b8; margin-top: 8px;">${t.notRegisteredDesc}</p>
                    <div style="margin-top: 16px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 12px; padding: 12px;">
                        <p style="color: white; font-size: 12px;">${t.feeLabel}: 105 USDT</p>
                    </div>
                </div>
            `;
            return;
        }
        
        const joinTime = userInfo[0] != 0 ? new Date(Number(userInfo[0]) * 1000).toLocaleDateString(currentLang === "fa" ? "fa-IR" : "en-US") : "-";
        const t = translations[currentLang];
        
        document.getElementById("userInfoSection").innerHTML = `
            <div class="user-details">
                <div class="detail-row">
                    <span class="detail-label">${t.joinDate}</span>
                    <span class="detail-value">${joinTime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${t.totalWithdrawn}</span>
                    <span class="detail-value">${formatUSDT(userInfo[1])}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${t.status}</span>
                    <span class="detail-value">${userInfo[5] ? `<i class="fas fa-check-circle" style="color:#10b981"></i> ${t.statusActive}` : `<i class="fas fa-times-circle" style="color:#ef4444"></i> ${t.statusInactive}`}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">${t.monthWithdrawn}</span>
                    <span class="detail-value">${userInfo[6] ? `<i class="fas fa-check-circle" style="color:#10b981"></i> ${t.monthDone}` : `<i class="fas fa-hourglass-half" style="color:#f59e0b"></i> ${t.monthNotDone}`}</span>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error loading user:", error);
    }
}

// ==================== USDT Approval ====================
async function checkAllowance() {
    if (!usdtContract || !userAddress) return 0;
    try {
        return await usdtContract.methods.allowance(userAddress, CONTRACT_ADDRESS).call();
    } catch (error) {
        return 0;
    }
}

async function approveUSDT(amount) {
    if (!usdtContract || !userAddress) return false;
    try {
        showAlert(currentLang === "fa" ? "در حال تایید مجوز USDT..." : "Approving USDT...", "info");
        await usdtContract.methods.approve(CONTRACT_ADDRESS, amount).send({
            from: userAddress,
            gas: 200000
        });
        showAlert(currentLang === "fa" ? "✅ مجوز USDT تایید شد!" : "✅ USDT Approved!", "success");
        return true;
    } catch (error) {
        showAlert(currentLang === "fa" ? "❌ تایید مجوز ناموفق" : "❌ Approval Failed", "error");
        return false;
    }
}

// ==================== Main Actions ====================
async function depositToPool() {
    if (!contract || !userAddress) {
        showAlert(currentLang === "fa" ? "لطفاً کیف پول را متصل کنید" : "Please connect wallet", "error");
        return;
    }
    
    const amountUSDT = parseFloat(document.getElementById("depositAmount").value);
    if (!amountUSDT || amountUSDT <= 0) {
        showAlert(currentLang === "fa" ? "مبلغ معتبر وارد کنید" : "Enter valid amount", "error");
        return;
    }
    
    const amount = amountUSDT * 1e6;
    
    if (isProcessing) {
        showAlert(currentLang === "fa" ? "لطفاً صبر کنید..." : "Please wait...", "warning");
        return;
    }
    
    isProcessing = true;
    const btn = document.getElementById("depositBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + (currentLang === "fa" ? "در حال واریز..." : "Depositing...");
    
    try {
        const allowance = await checkAllowance();
        if (Number(allowance) < amount) {
            const approved = await approveUSDT(amount);
            if (!approved) {
                isProcessing = false;
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-wallet"></i> ' + (currentLang === "fa" ? "واریز به استخر" : "Deposit to Pool");
                return;
            }
        }
        
        await contract.methods.depositToPool(amount).send({
            from: userAddress,
            gas: 500000
        });
        
        showAlert(`${amountUSDT} USDT ${currentLang === "fa" ? "واریز شد!" : "Deposited!"}`, "success");
        document.getElementById("depositAmount").value = "";
        await loadPoolInfo();
        await loadUserInfo();
    } catch (error) {
        showAlert(currentLang === "fa" ? "❌ واریز ناموفق" : "❌ Deposit Failed", "error");
    } finally {
        isProcessing = false;
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-wallet"></i> ' + (currentLang === "fa" ? "واریز به استخر" : "Deposit to Pool");
    }
}

async function register() {
    if (!contract || !userAddress) {
        showAlert(currentLang === "fa" ? "لطفاً کیف پول را متصل کنید" : "Please connect wallet", "error");
        return;
    }
    
    let referrer = document.getElementById("referrerAddress").value.trim();
    if (!referrer) referrer = "0x0000000000000000000000000000000000000000";
    else if (!web3.utils.isAddress(referrer)) {
        showAlert(currentLang === "fa" ? "آدرس معرف نامعتبر است" : "Invalid referrer address", "error");
        return;
    }
    
    if (isProcessing) {
        showAlert(currentLang === "fa" ? "لطفاً صبر کنید..." : "Please wait...", "warning");
        return;
    }
    
    isProcessing = true;
    const btn = document.getElementById("registerBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + (currentLang === "fa" ? "در حال ثبت‌نام..." : "Registering...");
    
    try {
        const fee = await contract.methods.REGISTRATION_FEE().call();
        const allowance = await checkAllowance();
        
        if (Number(allowance) < Number(fee)) {
            const approved = await approveUSDT(fee);
            if (!approved) {
                isProcessing = false;
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLang === "fa" ? "ثبت‌نام (105 USDT)" : "Register (105 USDT)");
                return;
            }
        }
        
        await contract.methods.register(referrer).send({
            from: userAddress,
            gas: 500000
        });
        
        showAlert(currentLang === "fa" ? "✅ ثبت‌نام موفقیت‌آمیز بود!" : "✅ Registration Successful!", "success");
        document.getElementById("referrerAddress").value = "";
        await loadUserInfo();
        await loadPoolInfo();
    } catch (error) {
        if (error.message.includes("Max regs")) showAlert(currentLang === "fa" ? "❌ حداکثر ثبت‌نام تکمیل شده" : "❌ Max registrations reached", "error");
        else if (error.message.includes("Registered")) showAlert(currentLang === "fa" ? "❌ قبلاً ثبت‌نام کرده‌اید" : "❌ Already registered", "error");
        else if (error.message.includes("User denied")) showAlert(currentLang === "fa" ? "❌ شما تراکنش را رد کردید" : "❌ Transaction rejected", "warning");
        else showAlert(currentLang === "fa" ? "❌ ثبت‌نام ناموفق" : "❌ Registration Failed", "error");
    } finally {
        isProcessing = false;
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> ' + (currentLang === "fa" ? "ثبت‌نام (105 USDT)" : "Register (105 USDT)");
    }
}

async function withdraw() {
    if (!contract || !userAddress) {
        showAlert(currentLang === "fa" ? "لطفاً کیف پول را متصل کنید" : "Please connect wallet", "error");
        return;
    }
    
    if (isProcessing) {
        showAlert(currentLang === "fa" ? "لطفاً صبر کنید..." : "Please wait...", "warning");
        return;
    }
    
    isProcessing = true;
    const btn = document.getElementById("withdrawBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + (currentLang === "fa" ? "در حال برداشت..." : "Withdrawing...");
    
    try {
        await contract.methods.withdraw().send({
            from: userAddress,
            gas: 500000
        });
        
        showAlert(currentLang === "fa" ? "✅ برداشت موفقیت‌آمیز بود!" : "✅ Withdrawal Successful!", "success");
        await loadUserInfo();
        await loadPoolInfo();
    } catch (error) {
        if (error.message.includes("Month not init")) showAlert(currentLang === "fa" ? "❌ ماه جاری فعال نشده است" : "❌ Month not initialized", "warning");
        else if (error.message.includes("Already withdrawn")) showAlert(currentLang === "fa" ? "❌ این ماه برداشت کرده‌اید" : "❌ Already withdrawn this month", "warning");
        else if (error.message.includes("Not active")) showAlert(currentLang === "fa" ? "❌ حساب شما فعال نیست" : "❌ Account not active", "error");
        else showAlert(currentLang === "fa" ? "❌ برداشت ناموفق" : "❌ Withdrawal Failed", "error");
    } finally {
        isProcessing = false;
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-money-bill-wave"></i> ' + (currentLang === "fa" ? "برداشت سود ماهانه" : "Withdraw Monthly Profit");
    }
}

async function cancel() {
    if (!contract || !userAddress) {
        showAlert(currentLang === "fa" ? "لطفاً کیف پول را متصل کنید" : "Please connect wallet", "error");
        return;
    }
    
    const confirmed = await Swal.fire({
        title: currentLang === "fa" ? '⚠️ درخواست انصراف' : '⚠️ Cancellation Request',
        html: currentLang === "fa" 
            ? 'آیا از انصراف اطمینان دارید؟<br><br>پس از انصراف:<br>• دیگر سود ماهانه دریافت نمی‌کنید<br>• هزینه ثبت‌نام بازگردانده نمی‌شود' 
            : 'Are you sure you want to cancel?<br><br>After cancellation:<br>• You will no longer receive monthly profits<br>• Registration fee will not be refunded',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6366f1',
        confirmButtonText: currentLang === "fa" ? 'بله، درخواست می‌دهم' : 'Yes, Request',
        cancelButtonText: currentLang === "fa" ? 'انصراف' : 'Cancel',
        background: '#1e1e2f',
        color: '#f1f5f9'
    });
    
    if (!confirmed.isConfirmed) return;
    
    if (isProcessing) {
        showAlert(currentLang === "fa" ? "لطفاً صبر کنید..." : "Please wait...", "warning");
        return;
    }
    
    isProcessing = true;
    const btn = document.getElementById("cancelBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + (currentLang === "fa" ? "در حال ارسال درخواست..." : "Sending request...");
    
    try {
        await contract.methods.cancel().send({
            from: userAddress,
            gas: 500000
        });
        
        showAlert(currentLang === "fa" ? "✅ درخواست انصراف با موفقیت ثبت شد! مدیر بررسی می‌کند." : "✅ Cancellation request submitted! Admin will review.", "success");
        await loadUserInfo();
        await loadPoolInfo();
    } catch (error) {
        showAlert(currentLang === "fa" ? "❌ خطا در ثبت درخواست" : "❌ Request failed", "error");
    } finally {
        isProcessing = false;
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + (currentLang === "fa" ? "درخواست انصراف" : "Request Cancellation");
    }
}

// ==================== Wallet Connection ====================
async function switchToPolygon() {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }]
        });
        return true;
    } catch (error) {
        if (error.code === 4902) {
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
        }
        return false;
    }
}

async function connectWallet() {
    if (!window.ethereum) {
        Swal.fire({
            title: currentLang === "fa" ? 'متاماسک نصب نیست!' : 'MetaMask not installed!',
            text: currentLang === "fa" ? 'لطفاً متاماسک را نصب کنید' : 'Please install MetaMask',
            icon: 'error',
            confirmButtonText: currentLang === "fa" ? 'نصب متاماسک' : 'Install MetaMask'
        }).then(() => {
            window.open("https://metamask.io/download/", "_blank");
        });
        return;
    }
    
    const btn = document.getElementById("connectBtn");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + (currentLang === "fa" ? "در حال اتصال..." : "Connecting...");
    
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        if (chainId !== "0x89") {
            showAlert(currentLang === "fa" ? "در حال سوئیچ به پالیگان..." : "Switching to Polygon...", "info");
            await switchToPolygon();
            setTimeout(() => window.location.reload(), 1000);
            return;
        }
        
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        usdtContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
        
        document.getElementById("statusText").innerHTML = formatAddress(userAddress);
        document.getElementById("statusIndicator").classList.add("connected");
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("connectBtn").style.display = "none";
        document.getElementById("contractAddr").innerHTML = CONTRACT_ADDRESS;
        
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
        console.error(error);
        showAlert(currentLang === "fa" ? "خطا در اتصال" : "Connection error", "error");
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-plug"></i> ' + (currentLang === "fa" ? "اتصال کیف پول" : "Connect Wallet");
    }
}

// ==================== Tab Switching ====================
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
    
    // Set first tab as active (Profile)
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        document.getElementById('tab-profile').classList.add('active');
    }
}

// ==================== Event Listeners ====================
window.onload = () => {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", () => window.location.reload());
        window.ethereum.on("chainChanged", () => window.location.reload());
    }
    
    initTabs();
    
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.getAttribute('data-amount');
            document.getElementById("depositAmount").value = amount;
        });
    });
    
    document.getElementById("langFa").addEventListener("click", () => setLanguage("fa"));
    document.getElementById("langEn").addEventListener("click", () => setLanguage("en"));
    
    updateLanguage();
};

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("depositBtn").onclick = depositToPool;
document.getElementById("registerBtn").onclick = register;
document.getElementById("withdrawBtn").onclick = withdraw;
document.getElementById("cancelBtn").onclick = cancel;

console.log("✅ DApp Loaded | Contract:", CONTRACT_ADDRESS);
