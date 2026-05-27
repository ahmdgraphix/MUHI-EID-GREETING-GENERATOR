const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const postcss = require('postcss');
const prefixWrap = require('postcss-prefix-selector');

const TEMPLATES_DIR = '/Users/irshadahamed/cards template';
const OUTPUT_FILE = path.join(__dirname, '../src/data/templates.json');

async function processTemplates() {
  const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.html'));
  const templates = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const html = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');
    const $ = cheerio.load(html);

    // Set Title to EID CARD - X
    const title = `EID CARD - ${i + 1}`;

    // Get CSS and scale up all font sizes by 30% to make them more readable
    let css = $('style').html() || '';
    css = css.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (match, p1) => {
      const newSize = Math.round(parseFloat(p1) * 1.3);
      return `font-size: ${newSize}px`;
    });
    
    // Clean CSS: Remove body background that conflicts, remove * reset
    css = css.replace(/\*\s*\{[^}]+\}/g, '');
    css = css.replace(/body\s*\{[^}]+\}/g, '');

    // Prefix CSS to isolate it
    const prefix = `.template-${i + 1}`;
    // Remove all the old logo wrappers completely to prevent broken images or overlaps
    $('.logo-wrap, .logo-header, .logo-bottom').remove();
    
    // Inject the massive logo safely at the top of the content area
    let targetContainer = $('.content');
    if (targetContainer.length === 0) targetContainer = $('.panel');
    if (targetContainer.length === 0) targetContainer = $('.card');

    targetContainer.prepend(`
      <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 24px; z-index: 100;">
        <img src="/logo.png" alt="MUHI Logo" style="height: 180px; width: auto; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));" />
      </div>
    `);

    // Override height to 1350px for 4:5 aspect ratio
    css += `\n.card { height: 1350px !important; }`;
    
    // Patch background SVGs so they gracefully cover the new 1350px height without breaking.
    // ONLY target specific background/mesh SVGs, NOT the small decorative ones!
    $('svg.dots, svg.mesh').attr('preserveAspectRatio', 'xMidYMid slice');
    $('svg.dots, svg.mesh').css('width', '100%');
    $('svg.dots, svg.mesh').css('height', '100%');

    const processedCss = await postcss([
      prefixWrap({ prefix, exclude: [prefix, /@keyframes/] })
    ]).process(css, { from: undefined });

    // Get HTML content
    const cardContent = $('.card').html();

    // Variable Injection setup
    let htmlString = cardContent || '';

    // Replace hardcoded message text with placeholder
    htmlString = htmlString.replace(/May your sacrifice bring endless blessings/gi, '{{message}}');
    
    // Clean up extra subtitle texts to make room for Name footer
    htmlString = htmlString.replace(/Wishing you peace, happiness & prosperity/gi, '');
    htmlString = htmlString.replace(/Wishing you peace, happiness and prosperity/gi, '');
    htmlString = htmlString.replace(/and fill your life with divine mercy/gi, '');

    templates.push({
      id: `template-${i + 1}`,
      title,
      css: processedCss.css,
      html: htmlString
    });
  }

  // Write output
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(templates, null, 2));
  console.log(`Successfully processed ${templates.length} templates!`);
}

processTemplates().catch(console.error);
