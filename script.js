document.addEventListener('DOMContentLoaded', function () {
    const rooms = [
        { number: 101, type: 'Triple' },
        { number: 102, type: 'Triple' },
        { number: 103, type: 'Triple' },
        { number: 104, type: 'Triple' },
        { number: 201, type: 'Double Twin' },
        { number: 202, type: 'Triple' },
        { number: 203, type: 'Triple' },
        { number: 204, type: 'Triple' },
        { number: 205, type: 'Triple' },
        { number: 206, type: 'Triple' },
        { number: 207, type: 'Triple' },
        { number: 208, type: 'Quattro' },
        { number: 211, type: 'Double' },
        { number: 212, type: 'Triple' },
        { number: 213, type: 'Quattro' },
        { number: 214, type: 'Quattro' },
        { number: 215, type: 'Double BIG' },
        { number: 216, type: 'Double' },
        { number: 217, type: 'Double' },
        { number: 218, type: 'Double' },
        { number: 301, type: 'Double TWIN' },
        { number: 302, type: 'Triple' },
        { number: 303, type: 'Triple' },
        { number: 304, type: 'Triple' },
        { number: 305, type: 'Triple' },
        { number: 306, type: 'Triple' },
        { number: 307, type: 'Triple' },
        { number: 308, type: 'Quattro' },
        { number: 311, type: 'Double' },
        { number: 312, type: 'Triple' },
        { number: 313, type: 'Quattro' },
        { number: 314, type: 'Quattro' },
        { number: 315, type: 'Double Big' },
        { number: 316, type: 'Double' },
        { number: 317, type: 'Double' },
        { number: 318, type: 'Double' },
        { number: 401, type: 'Quattro' },
        { number: 402, type: 'Double' },
        { number: 403, type: 'Double' },
        { number: 404, type: 'Double' },
        { number: 405, type: 'Double Twin' },
        { number: 406, type: 'Double' },
        { number: 407, type: 'Double' },
        { number: 411, type: 'Double' },
        { number: 412, type: 'Triple' },
        { number: 413, type: 'Quattro' },
        { number: 414, type: 'Quattro' },
        { number: 415, type: 'Double BIG' },
        { number: 416, type: 'Double' },
        { number: 417, type: 'Double' },
        { number: 418, type: 'Double' },
        { number: 501, type: 'Double' },
        { number: 502, type: 'Studio' },
        { number: 503, type: 'Studio' },
        { number: 504, type: 'Studio' },
        { number: 505, type: 'Studio' },
        { number: 506, type: 'Studio' },
        { number: 507, type: 'Studio' },
        { number: 508, type: 'Studio' },
        { number: 511, type: 'Studio' },
        { number: 512, type: 'Studio' },
        { number: 513, type: 'Studio' },
        { number: 514, type: 'Studio' },
        { number: 515, type: 'Studio' },
        { number: 516, type: 'Studio' },
        { number: 517, type: 'Double' },
        { number: 518, type: 'Double' },
        { number: 1001, type: 'Studio' },
        { number: 1002, type: 'Studio' },
        { number: 1003, type: 'Studio' },
        { number: 1004, type: 'Studio' },
        { number: 1005, type: 'Triple' },
        { number: 1006, type: 'Triple' },
        { number: 1007, type: 'Studio' },
        { number: 1008, type: 'Studio' },
        { number: 2001, type: 'Studio' },
        { number: 2002, type: 'Studio' },
        { number: 2003, type: 'Studio' },
        { number: 2004, type: 'Studio' },
        { number: 2005, type: 'Triple' },
        { number: 2006, type: 'Triple' },
        { number: 2007, type: 'Studio' },
        { number: 2008, type: 'Studio' }
    ];
    
    
    const calendarContainer = document.getElementById('calendar');
    const roomList = document.getElementById('room-list');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const bookingForm = document.getElementById('booking-form');
    const currentMonth = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const cancelBookingBtn = document.getElementById('cancel-booking');
    
    const months = ['June', 'July', 'August', 'September'];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let currentMonthIndex = 1; // Start with July
    
    // Generate room numbers and types
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.textContent = `${room.type} ${room.number}`;
        li.dataset.roomNumber = room.number;
        roomList.appendChild(li);
    });

    // Generate calendar for the current month
    function generateCalendar(monthIndex) {
        calendarContainer.innerHTML = '';
        currentMonth.textContent = months[monthIndex];
        
        const daysInMonth = new Date(2024, monthIndex + 6, 0).getDate(); // Months are June(5), July(6), August(7), September(8)
        
        // Create header row for days of the week
        const daysRow = document.createElement('tr');
        daysRow.appendChild(document.createElement('th')); // Empty top-left corner
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(2024, monthIndex + 5, i); // Adjust month for Date constructor
            const th = document.createElement('th');
            th.textContent = daysOfWeek[date.getDay()];
            th.classList.add('day-of-week');
            daysRow.appendChild(th);
        }
        calendarContainer.appendChild(daysRow);
        
        // Create header row for dates
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // Empty top-left corner
        for (let i = 1; i <= daysInMonth; i++) {
            const th = document.createElement('th');
            th.textContent = i;
            headerRow.appendChild(th);
        }
        calendarContainer.appendChild(headerRow);
        
        rooms.forEach(room => {
            const row = document.createElement('tr');
            const roomCell = document.createElement('td');
            roomCell.textContent = `${room.type} ${room.number}`;
            roomCell.classList.add('fixed-room-number');
            row.appendChild(roomCell);
            
            for (let i = 1; i <= daysInMonth; i++) {
                const cell = document.createElement('td');
                cell.dataset.roomNumber = room.number;
                cell.dataset.date = `${2024}-${String(monthIndex + 6).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                cell.addEventListener('click', openBookingModal);
                row.appendChild(cell);
            }
            
            calendarContainer.appendChild(row);
        });
        
        loadBookings();
    }

    // Open booking modal
    function openBookingModal(event) {
        const roomNumber = event.target.dataset.roomNumber;
        const date = event.target.dataset.date;
        const booking = getBooking(roomNumber, date);

        if (booking) {
            // Populate modal with booking details
            document.getElementById('room-number').value = booking.roomNumber;
            document.getElementById('check-in-date').value = booking.checkInDate;
            document.getElementById('check-out-date').value = booking.checkOutDate;
            document.getElementById('guest-name').value = booking.guestName;
            document.getElementById('contact').value = booking.contact;
            document.getElementById('paid-status').value = booking.paidStatus;
            document.getElementById('adults').value = booking.adults;
            document.getElementById('children').value = booking.children;
            cancelBookingBtn.style.display = 'block';
        } else {
            // Populate modal with default values for new booking
            document.getElementById('room-number').value = roomNumber;
            document.getElementById('check-in-date').value = date;
            document.getElementById('check-out-date').value = date;
            document.getElementById('guest-name').value = '';
            document.getElementById('contact').value = '';
            document.getElementById('paid-status').value = 'paid';
            document.getElementById('adults').value = 1;
            document.getElementById('children').value = 0;
            cancelBookingBtn.style.display = 'none';
        }

        modal.style.display = 'block';
    }

     // Handle cancel booking button
     cancelBookingBtn.addEventListener('click', function () {
        const roomNumber = document.getElementById('room-number').value;
        const checkInDate = document.getElementById('check-in-date').value;
        const checkOutDate = document.getElementById('check-out-date').value;
        
        // Remove booking from local storage
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(booking => 
            !(booking.roomNumber == roomNumber && 
              booking.checkInDate == checkInDate && 
              booking.checkOutDate == checkOutDate));
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Update the calendar UI
        generateCalendar(currentMonthIndex);
        
        modal.style.display = 'none';
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Handle booking form submission
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const bookingData = {
            roomNumber: document.getElementById('room-number').value,
            checkInDate: document.getElementById('check-in-date').value,
            checkOutDate: document.getElementById('check-out-date').value,
            guestName: document.getElementById('guest-name').value,
            contact: document.getElementById('contact').value,
            paidStatus: document.getElementById('paid-status').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value
        };
        
        saveBooking(bookingData);
        modal.style.display = 'none';
        generateCalendar(currentMonthIndex);
    });
    
    // Save booking to local storage
    function saveBooking(booking) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const existingIndex = bookings.findIndex(b => 
            b.roomNumber == booking.roomNumber && 
            b.checkInDate == booking.checkInDate && 
            b.checkOutDate == booking.checkOutDate);
        if (existingIndex >= 0) {
            bookings[existingIndex] = booking;
        } else {
            bookings.push(booking);
        }
        localStorage.setItem('bookings', JSON.stringify(bookings));
        updateCellClass(booking);
    }
    
    // Update the cell class based on booking status
    function updateCellClass(booking) {
        const { roomNumber, checkInDate, checkOutDate, paidStatus } = booking;
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const cell = document.querySelector(`td[data-room-number="${roomNumber}"][data-date="${dateStr}"]`);
            if (cell) {
                cell.classList.remove('booked-paid', 'booked-not_paid', 'booked-deposit');
                cell.classList.add(`booked-${paidStatus}`);
            }
        }
    }

    // Get booking from local storage
    function getBooking(roomNumber, date) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        return bookings.find(booking => 
            booking.roomNumber == roomNumber && 
            new Date(booking.checkInDate) <= new Date(date) && 
            new Date(booking.checkOutDate) >= new Date(date));
    }

    // Load bookings from local storage
    function loadBookings() {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.forEach(booking => {
            updateCellClass(booking);
            const { roomNumber, checkInDate, checkOutDate } = booking;
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);
            
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const cell = document.querySelector(`td[data-room-number="${roomNumber}"][data-date="${dateStr}"]`);
                if (cell) {
                    cell.classList.add('booked');
                    cell.addEventListener('click', () => openBookingModalWithDetails(booking));
                }
            }
        });
    }

    

    // Handle month navigation
    prevMonthBtn.addEventListener('click', () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            generateCalendar(currentMonthIndex);
        }
    });
    
    nextMonthBtn.addEventListener('click', () => {
        if (currentMonthIndex < months.length - 1) {
            currentMonthIndex++;
            generateCalendar(currentMonthIndex);
        }
    });
    
    // Initialize calendar
    generateCalendar(currentMonthIndex);
});
