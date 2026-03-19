const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatMonthName(monthIndex) {
  return MONTH_NAMES[monthIndex] || '';
}

function monthFileName(monthIndex) {
  const names = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  return `${names[monthIndex]}.html`;
}

function createCalendar(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarBody = document.getElementById('calendarBody');
  if (!calendarBody) return;
  calendarBody.innerHTML = '';

  let row;
  let cell;
  let date = 1;

  for (let week = 0; week < 6; week += 1) {
    row = document.createElement('tr');

    for (let day = 0; day < 7; day += 1) {
      cell = document.createElement('td');

      if ((week === 0 && day < startDay) || date > daysInMonth) {
        cell.innerHTML = '&nbsp;';
      } else {
        const span = document.createElement('span');
        span.textContent = String(date);

        const isToday = (() => {
          const today = new Date();
          return (
            date === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          );
        })();

        if (isToday) {
          span.classList.add('today');
        }

        cell.appendChild(span);
        date += 1;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);

    if (date > daysInMonth) {
      break;
    }
  }
}

function updateUI(year, month) {
  const monthName = formatMonthName(month);
  const monthYearEl = document.getElementById('monthYear');
  const monthTitleEl = document.getElementById('monthTitle');

  if (monthYearEl) {
    monthYearEl.textContent = `${monthName} ${year}`;
  }

  if (monthTitleEl) {
    monthTitleEl.textContent = `${monthName} ${year} Calendar`;
  }

  if (document.title) {
    document.title = `${monthName} ${year} Calendar`;
  }

  createCalendar(year, month);

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    const prevMonth = month === 0 ? 11 : month - 1;
    prevBtn.addEventListener('click', () => {
      window.location.href = monthFileName(prevMonth);
    });
  }

  if (nextBtn) {
    const nextMonth = month === 11 ? 0 : month + 1;
    nextBtn.addEventListener('click', () => {
      window.location.href = monthFileName(nextMonth);
    });
  }
}

function initCalendar() {
  const now = new Date();
  const month = Number.isFinite(window.CALENDAR_MONTH) ? window.CALENDAR_MONTH - 1 : now.getMonth();
  const year = Number.isFinite(window.CALENDAR_YEAR) ? window.CALENDAR_YEAR : now.getFullYear();

  updateUI(year, month);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalendar);
} else {
  initCalendar();
}
