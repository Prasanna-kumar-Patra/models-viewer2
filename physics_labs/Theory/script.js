const panel = document.getElementById('panel');
const content = document.getElementById('content');
const viewer = document.getElementById('viewer');
const filterInput = document.getElementById('filterInput');
const exitSearchButton = document.getElementById('exitSearchButton');
const expandButton = document.getElementById('expandButton');
const panelScrim = document.getElementById('panelScrim');
const previewsToggler = document.getElementById('previewsToggler');

const sectionLink = document.querySelector('#sections > a');
const sectionDefaultHref = sectionLink.href;

const links = {};
const validRedirects = new Map();
const container = document.createElement('div');

let selected = null;

init();

async function init() {

    content.appendChild(container);
    content.classList.toggle('minimal');
    const files = await (await fetch('files.json')).json();
    const tags = await (await fetch('tags.json')).json();
    // console.log('files', files)
    for (const key in files) {

        const section = files[key];

        const header = document.createElement('h2');
        header.textContent = key;
        header.setAttribute('data-category', key);
        container.appendChild(header);

        for (let i = 0; i < section.length; i++) {

            const file = section[i];
            const template = `
						<div class="card">
							<a href="Simulations/${file}.html" target="viewer">
								<div class="cover">
									<img src="../../assets/screenshots/${file}.jpg" loading="lazy" width="400px" />
								</div>
							<div class="title">${getName(file)}</div>
						</a>
					</div>
					`;
            const div = document.createElement('div');
            div.innerHTML = template.trim();

            const link = div.firstChild;
            container.appendChild(link);

            links[file] = link;
            validRedirects.set(file, 'Simulations/' + file + '.html');

        }

    }


    if (window.location.hash !== '') {

        const file = window.location.hash.substring(1);

        // use a predefined map of redirects to avoid untrusted URL redirection due to user-provided value

        if (validRedirects.has(file) === true) {

            selectFile(file);
            viewer.src = validRedirects.get(file);
            viewer.style.display = 'unset';

        }

    }

    // if (viewer.src === '') {

    //     viewer.srcdoc = document.getElementById('PlaceholderHTML').innerHTML;
    //     viewer.style.display = 'unset';

    // }

    filterInput.value = extractQuery();

    if (filterInput.value !== '') {

        panel.classList.add('searchFocused');

        updateFilter(files, tags);

    } else {

        updateLink('');

    }

    // Events

    filterInput.onfocus = function () {

        panel.classList.add('searchFocused');

    };

    filterInput.onblur = function () {

        if (filterInput.value === '') {

            panel.classList.remove('searchFocused');

        }

    };

    exitSearchButton.onclick = function () {

        filterInput.value = '';
        updateFilter(files, tags);
        panel.classList.remove('searchFocused');

    };

    filterInput.addEventListener('input', function () {

        updateFilter(files, tags);

    });


    expandButton.addEventListener('click', function (event) {

        event.preventDefault();
        panel.classList.toggle('open');

    });

    panelScrim.onclick = function (event) {

        event.preventDefault();
        panel.classList.toggle('open');

    };

    previewsToggler.onclick = function (event) {

        event.preventDefault();
        content.classList.toggle('minimal');

    };

    // iOS iframe auto-resize workaround

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {

        viewer.style.width = getComputedStyle(viewer).width;
        viewer.style.height = getComputedStyle(viewer).height;
        viewer.setAttribute('scrolling', 'no');

    }

}

function createLink(file) {

    const template = `
				<div class="card">
					<a href="${file}.html" target="viewer">
						<div class="cover">
							<img src="../../assets/screenshots/${file}.jpg" loading="lazy" width="400" />
						</div>
						<div class="title">${getName(file)}</div>
					</a>
				</div>
			`;

    const link = createElementFromHTML(template);

    link.querySelector('a[target="viewer"]').addEventListener('click', function (event) {

        if (event.button !== 0 || event.ctrlKey || event.altKey || event.metaKey) return;

        selectFile(file);

    });

    return link;

}

function selectFile(file) {

    if (selected !== null) links[selected].classList.remove('selected');

    links[file].classList.add('selected');

    window.location.hash = file;
    viewer.focus();
    viewer.style.display = 'unset';

    panel.classList.remove('open');

    selected = file;

}

function updateFilter(files, tags) {

    let v = filterInput.value.trim();
    v = v.replace(/\s+/gi, ' '); // replace multiple whitespaces with a single one

    if (v !== '') {

        window.history.replaceState({}, '', '?q=' + v + window.location.hash);

    } else {

        window.history.replaceState({}, '', window.location.pathname + window.location.hash);

    }

    const exp = new RegExp(v, 'gi');

    for (const key in files) {

        const section = files[key];

        for (let i = 0; i < section.length; i++) {

            filterExample(section[i], exp, tags);

        }

    }

    layoutList(files);

    updateLink(v);

}

function updateLink(search) {

    // update docs link

    if (search) {

        const link = sectionLink.href.split(/[?#]/)[0];
        sectionLink.href = `${link}?q=${search}`;

    } else {

        sectionLink.href = sectionDefaultHref;

    }

}

function filterExample(file, exp, tags) {

    const link = links[file];
    const name = getName(file);
    if (file in tags) file += ' ' + tags[file].join(' ');
    const res = file.match(exp);
    let text;

    if (res && res.length > 0) {

        link.classList.remove('hidden');

        for (let i = 0; i < res.length; i++) {

            text = name.replace(res[i], '<b>' + res[i] + '</b>');

        }

        link.querySelector('.title').innerHTML = text;

    } else {

        link.classList.add('hidden');
        link.querySelector('.title').innerHTML = name;

    }

}

function getName(file) {

    const name = file.split('_');
    name.shift();
    return name.join('  ');

}

function layoutList(files) {

    for (const key in files) {

        let collapsed = true;

        const section = files[key];

        for (let i = 0; i < section.length; i++) {

            const file = section[i];

            if (links[file].classList.contains('hidden') === false) {

                collapsed = false;
                break;

            }

        }

        const element = document.querySelector('h2[data-category="' + key + '"]');

        if (collapsed) {

            element.classList.add('hidden');

        } else {

            element.classList.remove('hidden');

        }

    }

}

function extractQuery() {

    const search = window.location.search;

    if (search.indexOf('?q=') !== - 1) {

        return decodeURI(search.substr(3));

    }

    return '';

}

function createElementFromHTML(htmlString) {

    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;

}