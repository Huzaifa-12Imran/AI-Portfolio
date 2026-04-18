const fs = require('fs');
const path = require('path');

const files = [
  'app/_sections/ChatBlogContact.tsx',
  'app/_sections/GitHubActivity.tsx',
  'app/_sections/HeroSection.tsx',
  'app/_sections/PortfolioFeature.tsx',
  'app/_sections/ProjectCarousel.tsx',
  'app/_sections/FeaturedWork.tsx',
  'app/_sections/ProjectsSkills.tsx',
  'app/page.tsx',
  'components/layout/Navbar.tsx',
  'components/layout/Footer.tsx',
  'components/layout/CustomCursor.tsx'
];

const replacements = {
  'var(--obsidian)': 'var(--space-void)',
  'var(--obsidian-surface)': 'var(--space-surface)',
  'var(--obsidian-border)': 'var(--space-border)',
  'var(--gold)': 'var(--starlight)',
  'var(--gold-glow)': 'var(--starlight-glow)',
  'var(--chrome)': 'var(--starlight)',
  'var(--warm-sand)': 'var(--comet-tail)',
  'var(--cream)': 'var(--moon-dust)',
  'obsidian-card': 'space-card',
  'gold-glow-text': 'starlight-text'
};

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [key, value] of Object.entries(replacements)) {
      content = content.split(key).join(value);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
