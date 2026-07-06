const filters = document.getElementById('blog-filters');
const grid    = document.getElementById('blog-grid');
const empty   = document.getElementById('blog-empty-filter');

if (filters && grid) {
  filters.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.filter-btn') as HTMLButtonElement | null;
    if (!btn) return;
    const tag = btn.dataset.tag!;
    filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    let visible = 0;
    grid.querySelectorAll<HTMLElement>('.blog-card').forEach(card => {
      const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      const show = tag === 'tutti' || cardTags.includes(tag);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.style.display = visible === 0 ? '' : 'none';
  });
}
