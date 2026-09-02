const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => {
            item.classList.add('visible');
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    }
}


/* Journal interaction */

const journalItems = document.querySelectorAll('.journal-item');

journalItems.forEach((item) => {
    const toggle = item.querySelector('.journal-toggle');

    toggle.addEventListener('click', () => {
        journalItems.forEach((journalItem) => {
            journalItem.classList.remove('active');

            const journalToggle =
                journalItem.querySelector('.journal-toggle');

            journalToggle.setAttribute('aria-expanded', 'false');
        });

        item.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
    });
});

const archiveFilters = document.querySelectorAll('.archive-filter');
const archiveEntries = document.querySelectorAll('.archive-entry');
const archiveEmpty = document.querySelector('.archive-empty');

archiveFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
        const selectedCategory = filter.dataset.filter;

        archiveFilters.forEach((button) => {
            const isActive = button === filter;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive.toString());
        });

        let visibleEntries = 0;

        archiveEntries.forEach((entry) => {
            const category = entry.dataset.category;

            const shouldShow =
                selectedCategory === 'all' ||
                selectedCategory === category;

            entry.hidden = !shouldShow;

            if (shouldShow) {
                visibleEntries++;
            }
        });

        if (archiveEmpty) {
            archiveEmpty.hidden = visibleEntries !== 0;
        }
    });
});