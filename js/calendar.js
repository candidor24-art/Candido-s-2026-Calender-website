function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function formatMonthName(monthIndex) {
  return new Date(0, monthIndex).toLocaleString(navigator.language, { month: 'long' });
}

function createCalendar(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarBody = document.getElementById('calendarBody');
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

  monthYearEl.textContent = `${monthName} ${year}`;
  monthTitleEl.textContent = `${monthName} ${year} Calendar`;

  createCalendar(year, month);
}

function setUrlMonth(year, month) {
  const url = new URL(window.location.href);
  url.searchParams.set('m', String(month + 1));
  url.searchParams.set('y', String(year));
  window.history.replaceState(null, '', url);
}

function initCalendar() {
  const now = new Date();
  const monthParam = parseInt(getQueryParam('m'), 10);
  const yearParam = parseInt(getQueryParam('y'), 10);

  const month = Number.isFinite(monthParam) ? monthParam - 1 : now.getMonth();
  const year = Number.isFinite(yearParam) ? yearParam : now.getFullYear();

  updateUI(year, month);
  setUrlMonth(year, month);

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.addEventListener('click', () => {
    const prev = new Date(year, month - 1, 1);
    updateUI(prev.getFullYear(), prev.getMonth());
    setUrlMonth(prev.getFullYear(), prev.getMonth());
  });

  nextBtn.addEventListener('click', () => {
    const next = new Date(year, month + 1, 1);
    updateUI(next.getFullYear(), next.getMonth());
    setUrlMonth(next.getFullYear(), next.getMonth());
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalendar);
} else {
  initCalendar();
}
