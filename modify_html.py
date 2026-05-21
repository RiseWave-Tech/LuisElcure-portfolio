import os
from bs4 import BeautifulSoup

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

print("Loaded soup")

# 1. Move theme-switch-wrapper out of navbar-collapse
navbar_brand = soup.select_one('.navbar-brand')
theme_switch_wrapper = soup.select_one('.theme-switch-wrapper')
navbar_toggler = soup.select_one('.navbar-toggler')

if theme_switch_wrapper and navbar_toggler:
    print("Found theme switch wrapper and toggler")
    nav_item_switch = theme_switch_wrapper.parent
    if nav_item_switch and nav_item_switch.name == 'li':
        nav_item_switch.decompose() # Remove the li

    # Create a wrapper for toggler and theme switch
    d_flex = soup.new_tag('div', attrs={'class': 'd-flex align-items-center'})
    
    # safely add class
    classes = theme_switch_wrapper.get('class', [])
    if isinstance(classes, list):
        classes.append('me-3')
        theme_switch_wrapper['class'] = classes
    else:
        theme_switch_wrapper['class'] = classes + ' me-3'
        
    d_flex.append(theme_switch_wrapper)

    navbar_toggler_parent = navbar_toggler.parent
    navbar_toggler.extract()
    d_flex.append(navbar_toggler)
    navbar_brand.insert_after(d_flex)
else:
    print("Could not find theme_switch_wrapper or navbar_toggler")

# 2. Modify project cards
project_cards = soup.select('.project-card')
print(f"Found {len(project_cards)} project cards")
for card in project_cards:
    # Add modal triggers
    card['data-bs-toggle'] = 'modal'
    card['data-bs-target'] = '#projectModal'
    style = card.get('style', '')
    if not isinstance(style, str):
        style = ' '.join(style)
    card['style'] = style + ' cursor: pointer;'

    # Extract info
    h4 = card.find('h4')
    badge = card.select_one('.badge')
    p = card.find('p')
    img = card.find('img')
    video = card.find('video')

    if h4: card['data-title'] = h4.get_text(strip=True)
    if badge: card['data-category'] = badge.get_text(strip=True)
    if p: card['data-description'] = p.get_text(strip=True)
    if img: 
        card['data-image'] = img.get('src', '')
        card['data-type'] = 'image'
    elif video:
        source = video.find('source')
        if source:
            card['data-image'] = source.get('src', '')
            card['data-type'] = 'video'

    # Check if this card is wrapped in an a tag
    parent = card.parent
    if parent and parent.name == 'a':
        link = parent.get('href', '')
        card['data-link'] = link
        parent.insert_after(card)
        parent.decompose() # remove the <a> wrapper

# 3. Add Modal HTML to the end of body
modal_html = """
    <!-- Project Detail Modal -->
    <div class="modal fade project-modal" id="projectModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content glass-effect">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold text-gradient" id="modalTitle">Project Title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="modalMediaContainer" class="text-center">
                        <img id="modalImage" src="" class="project-modal-media d-none" alt="Project Media">
                        <video id="modalVideo" class="project-modal-media d-none" autoplay muted loop playsinline>
                            <source src="" type="video/mp4">
                        </video>
                    </div>
                    <span class="badge bg-primary mb-3" id="modalCategory">Category</span>
                    <h4 class="fw-bold mb-3">Descripción del Proyecto</h4>
                    <p id="modalDescription" class="text-muted">Description goes here.</p>
                </div>
                <div class="modal-footer border-0 pt-0 justify-content-start">
                    <a href="#" id="modalLink" target="_blank" class="btn btn-primary rounded-pill d-none">
                        <i class="fas fa-external-link-alt me-2"></i> Ver Proyecto en Vivo
                    </a>
                </div>
            </div>
        </div>
    </div>
"""

modal_soup = BeautifulSoup(modal_html, 'html.parser')
body = soup.find('body')
if body:
    body.append(modal_soup)

# Save the modified html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Successfully wrote index.html")
