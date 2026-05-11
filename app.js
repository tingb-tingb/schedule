// ========== 数据管理 ==========
const STORAGE_SHIFTS_KEY = 'shift_scheduler_shifts';
const STORAGE_SCHEDULE_KEY = 'shift_scheduler_schedule';
const STORAGE_BG_KEY = 'shift_scheduler_bg';
const STORAGE_MEMOS_KEY = 'shift_scheduler_memos';

// ========== 法定节假日数据 ==========
// 中国法定节假日（2025-2026年）
const HOLIDAYS = {
    // 2025年（最新政策：法定节假日13天，三薪按实际法定假日当天计算）
    '2025-01-01': { name: '元旦', type: 'holiday', triple: true },
    '2025-01-28': { name: '春节(除夕)', type: 'holiday', triple: true },
    '2025-01-29': { name: '春节(初一)', type: 'holiday', triple: true },
    '2025-01-30': { name: '春节(初二)', type: 'holiday', triple: true },
    '2025-01-31': { name: '春节(初三)', type: 'holiday', triple: true },
    '2025-02-01': { name: '春节', type: 'holiday', triple: false },
    '2025-02-02': { name: '春节', type: 'holiday', triple: false },
    '2025-02-03': { name: '春节', type: 'holiday', triple: false },
    '2025-02-04': { name: '春节', type: 'holiday', triple: false },
    '2025-01-26': { name: '春节调班', type: 'workday' },
    '2025-02-08': { name: '春节调班', type: 'workday' },
    '2025-04-04': { name: '清明节', type: 'holiday', triple: true },
    '2025-04-05': { name: '清明节', type: 'holiday', triple: false },
    '2025-04-06': { name: '清明节', type: 'holiday', triple: false },
    '2025-05-01': { name: '劳动节', type: 'holiday', triple: true },
    '2025-05-02': { name: '劳动节', type: 'holiday', triple: true },
    '2025-05-03': { name: '劳动节', type: 'holiday', triple: false },
    '2025-05-04': { name: '劳动节', type: 'holiday', triple: false },
    '2025-05-05': { name: '劳动节', type: 'holiday', triple: false },
    '2025-04-27': { name: '劳动节调班', type: 'workday' },
    '2025-05-31': { name: '端午节', type: 'holiday', triple: true },
    '2025-06-01': { name: '端午节', type: 'holiday', triple: false },
    '2025-06-02': { name: '端午节', type: 'holiday', triple: false },
    '2025-10-01': { name: '国庆节', type: 'holiday', triple: true },
    '2025-10-02': { name: '国庆节', type: 'holiday', triple: true },
    '2025-10-03': { name: '国庆节', type: 'holiday', triple: true },
    '2025-10-04': { name: '国庆节', type: 'holiday', triple: false },
    '2025-10-05': { name: '国庆节', type: 'holiday', triple: false },
    '2025-10-06': { name: '国庆节', type: 'holiday', triple: false },
    '2025-10-07': { name: '国庆节', type: 'holiday', triple: false },
    '2025-10-08': { name: '国庆节', type: 'holiday', triple: false },
    '2025-09-28': { name: '国庆调班', type: 'workday' },
    '2025-10-11': { name: '国庆调班', type: 'workday' },
    // 2026年
    '2026-01-01': { name: '元旦', type: 'holiday', triple: true },
    '2026-01-02': { name: '元旦', type: 'holiday', triple: false },
    '2026-01-03': { name: '元旦', type: 'holiday', triple: false },
    '2026-02-16': { name: '春节(除夕)', type: 'holiday', triple: true },
    '2026-02-17': { name: '春节(初一)', type: 'holiday', triple: true },
    '2026-02-18': { name: '春节(初二)', type: 'holiday', triple: true },
    '2026-02-19': { name: '春节(初三)', type: 'holiday', triple: true },
    '2026-02-20': { name: '春节', type: 'holiday', triple: false },
    '2026-02-21': { name: '春节', type: 'holiday', triple: false },
    '2026-02-22': { name: '春节', type: 'holiday', triple: false },
    '2026-02-23': { name: '春节', type: 'holiday', triple: false },
    '2026-02-14': { name: '春节调班', type: 'workday' },
    '2026-02-28': { name: '春节调班', type: 'workday' },
    '2026-04-05': { name: '清明节', type: 'holiday', triple: true },
    '2026-04-06': { name: '清明节', type: 'holiday', triple: false },
    '2026-04-07': { name: '清明节', type: 'holiday', triple: false },
    '2026-05-01': { name: '劳动节', type: 'holiday', triple: true },
    '2026-05-02': { name: '劳动节', type: 'holiday', triple: true },
    '2026-05-03': { name: '劳动节', type: 'holiday', triple: false },
    '2026-05-04': { name: '劳动节', type: 'holiday', triple: false },
    '2026-05-05': { name: '劳动节', type: 'holiday', triple: false },
    '2026-04-26': { name: '劳动节调班', type: 'workday' },
    '2026-06-19': { name: '端午节', type: 'holiday', triple: true },
    '2026-06-20': { name: '端午节', type: 'holiday', triple: false },
    '2026-06-21': { name: '端午节', type: 'holiday', triple: false },
    '2026-10-01': { name: '国庆节', type: 'holiday', triple: true },
    '2026-10-02': { name: '国庆节', type: 'holiday', triple: true },
    '2026-10-03': { name: '国庆节', type: 'holiday', triple: true },
    '2026-10-04': { name: '国庆节', type: 'holiday', triple: false },
    '2026-10-05': { name: '国庆节', type: 'holiday', triple: false },
    '2026-10-06': { name: '国庆节', type: 'holiday', triple: false },
    '2026-10-07': { name: '国庆节', type: 'holiday', triple: false },
    '2026-09-27': { name: '国庆调班', type: 'workday' },
    '2026-10-10': { name: '国庆调班', type: 'workday' },
};

// 默认班次
const DEFAULT_SHIFTS = [
    { id: '1', name: '早班', color: '#4CAF50' },
    { id: '2', name: '中班', color: '#FF9800' },
    { id: '3', name: '晚班', color: '#9C27B0' },
    { id: '4', name: '休息', color: '#78909C' },
];

function loadShifts() {
    const data = localStorage.getItem(STORAGE_SHIFTS_KEY);
    return data ? JSON.parse(data) : DEFAULT_SHIFTS;
}

function saveShifts(shifts) {
    localStorage.setItem(STORAGE_SHIFTS_KEY, JSON.stringify(shifts));
}

function loadSchedule() {
    const data = localStorage.getItem(STORAGE_SCHEDULE_KEY);
    return data ? JSON.parse(data) : {};
}

function saveSchedule(schedule) {
    localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(schedule));
}

function loadMemos() {
    const data = localStorage.getItem(STORAGE_MEMOS_KEY);
    return data ? JSON.parse(data) : {};
}

function saveMemos(memos) {
    localStorage.setItem(STORAGE_MEMOS_KEY, JSON.stringify(memos));
}

// ========== 状态 ==========
let shifts = loadShifts();
let schedule = loadSchedule();
let memos = loadMemos();
let currentYear, currentMonth;
let selectedDate = null;

// 初始化为当前月份
const today = new Date();
currentYear = today.getFullYear();
currentMonth = today.getMonth();

// ========== DOM 元素 ==========
const monthTitle = document.getElementById('monthTitle');
const calendarGrid = document.getElementById('calendarGrid');
const legend = document.getElementById('legend');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnSettings = document.getElementById('btnSettings');
const settingsModal = document.getElementById('settingsModal');
const btnCloseSettings = document.getElementById('btnCloseSettings');
const shiftList = document.getElementById('shiftList');
const newShiftName = document.getElementById('newShiftName');
const newShiftColor = document.getElementById('newShiftColor');
const btnAddShift = document.getElementById('btnAddShift');
const selectShiftModal = document.getElementById('selectShiftModal');
const btnCloseSelect = document.getElementById('btnCloseSelect');
const selectShiftTitle = document.getElementById('selectShiftTitle');
const shiftOptions = document.getElementById('shiftOptions');
const btnClearShift = document.getElementById('btnClearShift');
const memoInput = document.getElementById('memoInput');
const btnSaveMemo = document.getElementById('btnSaveMemo');
const triplePayTip = document.getElementById('triplePayTip');
const btnBg = document.getElementById('btnBg');
const bgModal = document.getElementById('bgModal');
const btnCloseBg = document.getElementById('btnCloseBg');
const bgPreview = document.getElementById('bgPreview');
const bgPlaceholder = document.getElementById('bgPlaceholder');
const bgFileInput = document.getElementById('bgFileInput');
const btnRemoveBg = document.getElementById('btnRemoveBg');
const memoList = document.getElementById('memoList');
const btnSearch = document.getElementById('btnSearch');
const searchModal = document.getElementById('searchModal');
const btnCloseSearch = document.getElementById('btnCloseSearch');
const searchInput = document.getElementById('searchInput');
const btnDoSearch = document.getElementById('btnDoSearch');
const searchResults = document.getElementById('searchResults');
const filterQuickMonths = document.getElementById('filterQuickMonths');
const filterStart = document.getElementById('filterStart');
const filterEnd = document.getElementById('filterEnd');

// ========== 日历渲染 ==========
function renderCalendar() {
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月',
                        '7月', '8月', '9月', '10月', '11月', '12月'];
    monthTitle.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;

    // 获取当月第一天是星期几（0=周日，转换为周一开始）
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    // 当月天数
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // 空白填充
    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        emptyCell.innerHTML = '<div class="day-cell-inner"></div>';
        calendarGrid.appendChild(emptyCell);
    }

    // 日期格子
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'day-cell';

        if (dateStr === todayStr) {
            cell.classList.add('today');
        }

        const shiftId = schedule[dateStr];
        const shift = shiftId ? shifts.find(s => s.id === shiftId) : null;

        let innerHTML = '';
        let innerStyle = '';

        if (shift) {
            cell.classList.add('has-shift');
            innerStyle = `background:${shift.color}`;
            innerHTML = `<span class="day-number">${day}</span><span class="shift-label">${shift.name}</span>`;
        } else {
            innerHTML = `<span class="day-number">${day}</span>`;
        }

        // 节假日标记
        const holiday = HOLIDAYS[dateStr];
        if (holiday) {
            if (holiday.type === 'holiday') {
                cell.classList.add('is-holiday');
                if (holiday.triple) {
                    innerHTML = `<span class="triple-badge">3×</span>` + innerHTML;
                }
                innerHTML = innerHTML + `<span class="holiday-badge">休</span>`;
                if (!shift) {
                    innerHTML += `<span class="holiday-label">${holiday.name}</span>`;
                }
            } else if (holiday.type === 'workday') {
                cell.classList.add('is-workday');
                innerHTML = innerHTML + `<span class="holiday-badge">班</span>`;
                if (!shift) {
                    innerHTML += `<span class="holiday-label">调休</span>`;
                }
            }
        }

        // 有日程的日期显示小圆点
        if (memos[dateStr]) {
            innerHTML += `<span class="memo-dot"></span>`;
        }

        cell.innerHTML = `<div class="day-cell-inner" style="${innerStyle}">${innerHTML}</div>`;
        cell.addEventListener('click', () => openSelectShift(dateStr, day));
        calendarGrid.appendChild(cell);
    }
}

function renderLegend() {
    legend.innerHTML = '';
    shifts.forEach(shift => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="legend-color" style="background:${shift.color}"></span>
            <span>${shift.name}</span>
        `;
        legend.appendChild(item);
    });
    // 节假日图例
    const holidayItem = document.createElement('div');
    holidayItem.className = 'legend-item';
    holidayItem.innerHTML = `<span class="legend-color" style="background:#ffebee; border:1px solid #e53935;"></span><span style="color:#e53935;">休 节假日</span>`;
    legend.appendChild(holidayItem);

    const workdayItem = document.createElement('div');
    workdayItem.className = 'legend-item';
    workdayItem.innerHTML = `<span class="legend-color" style="background:#fff3e0; border:1px solid #e65100;"></span><span style="color:#e65100;">班 调休</span>`;
    legend.appendChild(workdayItem);
}

// ========== 三薪提示 ==========
function renderTriplePayTip() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const tripleDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const holiday = HOLIDAYS[dateStr];
        if (holiday && holiday.type === 'holiday' && holiday.triple) {
            tripleDays.push({ day, name: holiday.name });
        }
    }

    if (tripleDays.length === 0) {
        triplePayTip.classList.remove('visible');
        return;
    }

    // 按节日分组
    const groups = {};
    tripleDays.forEach(d => {
        if (!groups[d.name]) groups[d.name] = [];
        groups[d.name].push(d.day);
    });

    let html = `<div class="tip-title">💰 本月三薪日提示</div>`;
    Object.keys(groups).forEach(name => {
        const days = groups[name].map(d => `${d}日`).join('、');
        html += `<div><span class="tip-dates">${name}：${currentMonth + 1}月${days}</span>（上班享三倍工资）</div>`;
    });

    triplePayTip.innerHTML = html;
    triplePayTip.classList.add('visible');
}

// ========== 日程列表渲染 ==========
function renderMemoList() {
    memoList.innerHTML = '';

    // 获取当月有日程的日期，按日期排序
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthMemos = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (memos[dateStr]) {
            monthMemos.push({ date: dateStr, day: day, text: memos[dateStr] });
        }
    }

    if (monthMemos.length === 0) return;

    // 标题
    const title = document.createElement('div');
    title.className = 'memo-list-title';
    title.textContent = '📝 本月日程';
    memoList.appendChild(title);

    // 列表项
    monthMemos.forEach(memo => {
        const lines = memo.text.split('\n');
        const firstLine = lines[0];
        const hasMore = lines.length > 1;

        const item = document.createElement('div');
        item.className = 'memo-list-item';

        item.innerHTML = `
            <div class="memo-list-item-header">
                <span class="memo-date-badge">${memo.day}日</span>
                <span class="memo-first-line">${firstLine}</span>
                ${hasMore ? '<span class="memo-expand-icon">▶</span>' : ''}
            </div>
            ${hasMore ? `<div class="memo-full-content">${memo.text}</div>` : ''}
        `;

        if (hasMore) {
            item.querySelector('.memo-list-item-header').addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        }

        memoList.appendChild(item);
    });
}

// ========== 班次选择弹窗 ==========
function openSelectShift(dateStr, day) {
    selectedDate = dateStr;
    selectShiftTitle.textContent = `${currentMonth + 1}月${day}日 - 选择班次`;

    shiftOptions.innerHTML = '';
    shifts.forEach(shift => {
        const option = document.createElement('div');
        option.className = 'shift-option';
        option.style.background = shift.color;
        option.textContent = shift.name;
        option.addEventListener('click', () => {
            schedule[dateStr] = shift.id;
            saveSchedule(schedule);
            closeSelectShift();
            renderCalendar();
        });
        shiftOptions.appendChild(option);
    });

    // 加载该日期的日程
    memoInput.value = memos[dateStr] || '';

    selectShiftModal.classList.add('active');
}

function closeSelectShift() {
    selectShiftModal.classList.remove('active');
    selectedDate = null;
}

// ========== 班次设置弹窗 ==========
function openSettings() {
    renderShiftList();
    settingsModal.classList.add('active');
}

function closeSettings() {
    settingsModal.classList.remove('active');
}

function renderShiftList() {
    shiftList.innerHTML = '';
    shifts.forEach(shift => {
        const item = document.createElement('div');
        item.className = 'shift-item';
        item.innerHTML = `
            <span class="shift-color-preview" style="background:${shift.color}"></span>
            <span class="shift-name">${shift.name}</span>
            <button class="btn-delete" data-id="${shift.id}" aria-label="删除${shift.name}">🗑️</button>
        `;
        shiftList.appendChild(item);
    });

    // 绑定删除事件
    shiftList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            shifts = shifts.filter(s => s.id !== id);
            saveShifts(shifts);
            // 清除使用该班次的排班
            Object.keys(schedule).forEach(key => {
                if (schedule[key] === id) {
                    delete schedule[key];
                }
            });
            saveSchedule(schedule);
            renderShiftList();
            renderCalendar();
            renderLegend();
        });
    });
}

function addShift() {
    const name = newShiftName.value.trim();
    const color = newShiftColor.value;

    if (!name) {
        newShiftName.focus();
        return;
    }

    const newShift = {
        id: Date.now().toString(),
        name: name,
        color: color,
    };

    shifts.push(newShift);
    saveShifts(shifts);
    newShiftName.value = '';
    renderShiftList();
    renderLegend();
}

// ========== 事件绑定 ==========
btnPrev.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
    renderTriplePayTip();
    renderMemoList();
});

btnNext.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
    renderTriplePayTip();
    renderMemoList();
});

btnSettings.addEventListener('click', openSettings);
btnCloseSettings.addEventListener('click', closeSettings);
btnCloseSelect.addEventListener('click', closeSelectShift);

btnAddShift.addEventListener('click', addShift);
newShiftName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addShift();
});

btnClearShift.addEventListener('click', () => {
    if (selectedDate) {
        delete schedule[selectedDate];
        saveSchedule(schedule);
        closeSelectShift();
        renderCalendar();
    }
});

btnSaveMemo.addEventListener('click', () => {
    if (selectedDate) {
        const text = memoInput.value.trim();
        if (text) {
            memos[selectedDate] = text;
        } else {
            delete memos[selectedDate];
        }
        saveMemos(memos);
        closeSelectShift();
        renderCalendar();
        renderMemoList();
    }
});

// 点击遮罩关闭弹窗
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) closeSettings();
});
selectShiftModal.addEventListener('click', (e) => {
    if (e.target === selectShiftModal) closeSelectShift();
});

// ========== 搜索日程 ==========
let activeFilterMonth = null; // null = 全部, 'YYYY-MM' = 指定月

function openSearchModal() {
    searchInput.value = '';
    searchResults.innerHTML = '';
    activeFilterMonth = null;
    filterStart.value = '';
    filterEnd.value = '';
    renderFilterMonths();
    searchModal.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
}

function closeSearchModal() {
    searchModal.classList.remove('active');
}

function renderFilterMonths() {
    filterQuickMonths.innerHTML = '';

    // "全部"按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-month-btn' + (activeFilterMonth === null ? ' active' : '');
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', () => {
        activeFilterMonth = null;
        filterStart.value = '';
        filterEnd.value = '';
        renderFilterMonths();
        doSearch();
    });
    filterQuickMonths.appendChild(allBtn);

    // 最近6个月的快捷按钮（含当月）
    const now = new Date();
    for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth();
        const key = `${y}-${String(m + 1).padStart(2, '0')}`;
        const label = i === 0 ? '本月' : `${m + 1}月`;

        const btn = document.createElement('button');
        btn.className = 'filter-month-btn' + (activeFilterMonth === key ? ' active' : '');
        btn.textContent = y === now.getFullYear() ? label : `${y}年${m + 1}月`;
        btn.addEventListener('click', () => {
            activeFilterMonth = key;
            // 同步到日期输入框
            const lastDay = new Date(y, m + 1, 0).getDate();
            filterStart.value = `${y}-${String(m + 1).padStart(2, '0')}-01`;
            filterEnd.value = `${y}-${String(m + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
            renderFilterMonths();
            doSearch();
        });
        filterQuickMonths.appendChild(btn);
    }
}

function getFilterRange() {
    const start = filterStart.value || null;
    const end = filterEnd.value || null;
    return { start, end };
}

function doSearch() {
    const keyword = searchInput.value.trim();
    if (!keyword) {
        searchResults.innerHTML = '<div class="search-empty">请输入关键词</div>';
        return;
    }

    const { start, end } = getFilterRange();

    // 搜索所有日程，按时间范围过滤
    const results = [];
    Object.keys(memos).sort().forEach(dateStr => {
        // 时间范围过滤
        if (start && dateStr < start) return;
        if (end && dateStr > end) return;

        const text = memos[dateStr];
        if (text.includes(keyword)) {
            results.push({ date: dateStr, text: text });
        }
    });

    if (results.length === 0) {
        searchResults.innerHTML = `<div class="search-empty">未找到包含"${keyword}"的日程</div>`;
        return;
    }

    // 统计匹配总次数
    let totalCount = 0;
    results.forEach(r => {
        const matches = r.text.split(keyword).length - 1;
        totalCount += matches;
    });

    // 渲染结果
    let html = `<div class="search-summary">找到 <strong>${results.length}</strong> 天的日程，共出现 <strong>${totalCount}</strong> 次"${keyword}"</div>`;

    results.forEach(r => {
        const parts = r.date.split('-');
        const dateLabel = `${parseInt(parts[1])}月${parseInt(parts[2])}日`;

        const highlightedText = r.text.replace(
            new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            `<mark>${keyword}</mark>`
        );

        html += `
            <div class="search-result-item">
                <span class="search-result-date">${dateLabel}</span>
                <span class="search-result-text">${highlightedText}</span>
            </div>
        `;
    });

    searchResults.innerHTML = html;
}

btnSearch.addEventListener('click', openSearchModal);
btnCloseSearch.addEventListener('click', closeSearchModal);
btnDoSearch.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
});
// 自定义日期变化时清除月份快捷选中，并自动搜索
filterStart.addEventListener('change', () => {
    activeFilterMonth = null;
    renderFilterMonths();
    if (searchInput.value.trim()) doSearch();
});
filterEnd.addEventListener('change', () => {
    activeFilterMonth = null;
    renderFilterMonths();
    if (searchInput.value.trim()) doSearch();
});
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
});

// ========== 背景图片管理 ==========
function loadBackground() {
    const bgData = localStorage.getItem(STORAGE_BG_KEY);
    if (bgData) {
        applyBackground(bgData);
    }
}

function applyBackground(dataUrl) {
    calendarGrid.classList.add('has-bg');
    // 通过 style 标签设置 ::before 背景图
    let styleEl = document.getElementById('bg-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'bg-style';
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `.calendar-grid.has-bg::before { background-image: url(${dataUrl}); }`;

    // 更新预览
    bgPreview.classList.add('has-image');
    bgPreview.innerHTML = `<img src="${dataUrl}" alt="背景预览">`;
}

function removeBackground() {
    localStorage.removeItem(STORAGE_BG_KEY);
    calendarGrid.classList.remove('has-bg');
    const styleEl = document.getElementById('bg-style');
    if (styleEl) styleEl.remove();
    bgPreview.classList.remove('has-image');
    bgPreview.innerHTML = `<span class="bg-placeholder">暂无背景图</span>`;
}

function openBgModal() {
    bgModal.classList.add('active');
}

function closeBgModal() {
    bgModal.classList.remove('active');
}

bgFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 限制文件大小（2MB 以内，localStorage 有限制）
    if (file.size > 2 * 1024 * 1024) {
        alert('图片太大，请选择 2MB 以内的图片');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const dataUrl = event.target.result;
        // 压缩图片以适应 localStorage
        compressImage(dataUrl, (compressed) => {
            localStorage.setItem(STORAGE_BG_KEY, compressed);
            applyBackground(compressed);
        });
    };
    reader.readAsDataURL(file);
    bgFileInput.value = '';
});

function compressImage(dataUrl, callback) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = dataUrl;
}

btnBg.addEventListener('click', openBgModal);
btnCloseBg.addEventListener('click', closeBgModal);
btnRemoveBg.addEventListener('click', removeBackground);
bgModal.addEventListener('click', (e) => {
    if (e.target === bgModal) closeBgModal();
});

// ========== 初始化 ==========
renderCalendar();
renderLegend();
renderTriplePayTip();
renderMemoList();
loadBackground();
