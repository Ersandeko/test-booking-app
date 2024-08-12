document.addEventListener('DOMContentLoaded', function () {
    const bookingsTable = document.getElementById('bookings-table').getElementsByTagName('tbody')[0];
    const filterDateInput = document.getElementById('filter-date');

    const rooms = [
        { number: 101, type: 'Triple' },
        { number: 102, type: 'Triple' },
        { number: 103, type: 'Triple' },
    ];

    function getRoomType(roomNumber) {
        const room = rooms.find(room => room.number == roomNumber);
        return room ? room.type : 'Unknown';
    }

    function loadBookings(filterDate) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookingsTable.innerHTML = ''; // Clear existing rows

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        bookings.forEach(booking => {
            if (filterDate) {
                const checkOutDate = new Date(booking.checkOutDate);
                const filterDateObj = new Date(filterDate);
                if (checkOutDate.toDateString() !== filterDateObj.toDateString()) {
                    return;
                }
            }

            const row = bookingsTable.insertRow();
            row.insertCell(0).textContent = `${getRoomType(booking.roomNumber)} ${booking.roomNumber}`;
            row.insertCell(1).textContent = booking.checkInDate;
            const checkOutDateCell = row.insertCell(2);
            checkOutDateCell.textContent = booking.checkOutDate;

            const checkOutDate = new Date(booking.checkOutDate);

            if (checkOutDate < today) {
                checkOutDateCell.style.backgroundColor = 'red'; // Expired
            } else if (checkOutDate.toDateString() === today.toDateString() || checkOutDate.toDateString() === tomorrow.toDateString()) {
                checkOutDateCell.style.backgroundColor = 'yellow'; // Expiring today or tomorrow
            } else {
                checkOutDateCell.style.backgroundColor = '#00b4d8'; // Not expired
            }
        });
    }

    filterDateInput.addEventListener('change', function () {
        loadBookings(filterDateInput.value);
    });

    loadBookings();
});
