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
    const details = item.querySelector('.journal-details');

    if (!toggle || !details) return;

    const setCollapsed = (collapsed) => {
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');

        // Keep collapsed panels out of the tab order and
        // the accessibility tree so hidden links are not focusable.
        if ('inert' in details) {
            details.inert = collapsed;
        }
    };

    setCollapsed(!item.classList.contains('active'));

    toggle.addEventListener('click', () => {
        // Clicking the active entry collapses it again.
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            setCollapsed(true);
            return;
        }

        journalItems.forEach((journalItem) => {
            const journalToggle =
                journalItem.querySelector('.journal-toggle');

            const journalDetails =
                journalItem.querySelector('.journal-details');

            journalItem.classList.remove('active');

            if (journalToggle) {
                journalToggle.setAttribute('aria-expanded', 'false');
            }

            if (journalDetails && 'inert' in journalDetails) {
                journalDetails.inert = true;
            }
        });

        item.classList.add('active');
        setCollapsed(false);
    });
});


/* Keep --header-height in sync with the actual header height */

const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
    const setHeaderHeight = () => {
        document.documentElement.style.setProperty(
            '--header-height',
            `${siteHeader.offsetHeight}px`
        );
    };

    setHeaderHeight();

    // Re-measure once web fonts have loaded, and on viewport changes.
    window.addEventListener('load', setHeaderHeight);
    window.addEventListener('resize', setHeaderHeight);
}