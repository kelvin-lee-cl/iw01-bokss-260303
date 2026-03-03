// Here is the new code



// Sample data for multiple portfolio items
const portfolioItemsData = [
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },
    {
        imageSrcs: ["images/portfolio/1/1.png", "images/portfolio/1/2.png", "images/portfolio/1/3.png", "images/portfolio/1/4.png", "images/portfolio/1/5.png", "images/portfolio/1/6.png", "images/portfolio/1/7.png", "images/portfolio/1/8.png", "images/portfolio/1/9.png", "images/portfolio/1/10.png"],
        title: "什麼都有餐廳",
        categories: ["Kathy", "Recraft AI"],
        href: "https://www.canva.com/design/DAGcQDSltOg/BRE1vVS1Ecf6KPxIzyU1Gw/view?utm_content=DAGcQDSltOg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12a70f016d",
        galleryHref: "#",
        sliderSettings: {
            initialDelay: 1000,
            speed: 300,
            pause: 8000  // Odd project: starts with 4000, will rotate to 8000
        }
    },



];

// Generate the HTML for all portfolio items and append them to the container
const portfolioContainer = document.getElementById('portfolio-container');
portfolioContainer.className = 'row g-0';
portfolioContainer.innerHTML = portfolioItemsData.map(item =>
    createPortfolioItem(item.imageSrcs, item.title, item.categories, item.href, item.galleryHref, item.sliderSettings)
).join('');



// Function to generate portfolio item HTML
function createPortfolioItem(imageSrcs, title, categories, href, galleryHref, sliderSettings = {}) {
    const speed = sliderSettings.speed;
    const pause = sliderSettings.pause;
    const initialDelay = sliderSettings.initialDelay;

    // Create the HTML structure using template literals
    return `
        <article class="portfolio-item col-12 col-sm-6 col-md-4 pf-icons pf-illustrations">
            <div class="grid-inner">
                <div class="portfolio-image">
                    <div class="fslider" data-arrows="false" 
                         data-speed="${speed}" 
                         data-pause="${pause}"
                         data-initial-delay="${initialDelay}">
                        <div class="flexslider">
                            <div class="slider-wrap">
                                ${imageSrcs.map(src => `
                                    <div class="slide">
                                        <a href="${galleryHref}">
                                            <img src="${src}" alt="${title}">
                                        </a>
                                    </div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="bg-overlay" data-lightbox="gallery">
                        <div class="bg-overlay-content dark" data-hover-animate="fadeIn" data-hover-parent=".portfolio-item">
                            <a href="${imageSrcs[0]}" class="overlay-trigger-icon bg-light text-dark"
                               data-hover-animate="fadeInDownSmall" data-hover-animate-out="fadeOutUpSmall"
                               data-hover-speed="350" data-hover-parent=".portfolio-item" data-lightbox="gallery-item">
                                <i class="uil uil-images"></i>
                            </a>
                            ${imageSrcs.slice(1).map(src => `
                                <a href="${src}" class="d-none" data-lightbox="gallery-item"></a>
                            `).join('')}

                            <a href="${href}" class="overlay-trigger-icon bg-light text-dark"
                               data-hover-animate="fadeInDownSmall" data-hover-animate-out="fadeOutUpSmall"
                               data-hover-speed="350" data-hover-parent=".portfolio-item">
                                <i class="uil uil-ellipsis-h"></i>
                            </a>
                        </div>
                        <div class="bg-overlay-bg dark" data-hover-animate="fadeIn" data-hover-parent=".portfolio-item"></div>
                    </div>
                </div>
                <div class="portfolio-desc">
                    <h3><a href="${galleryHref}">${title}</a></h3>
                    <span>${categories.map(cat => `<a href="#">${cat}</a>`).join(', ')}</span>
                </div>
            </div>
        </article>`;
}




