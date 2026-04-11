<?php
/**
 * Work / Portfolio Section
 * ─────────────────────────────────────────────────────────────────
 * To add or remove a project, edit the $projects array below.
 * The loop handles all HTML output — no touching markup needed.
 *
 * Per-project fields:
 *   title        string   Project name shown in the card footer
 *   category     string   Displayed as subtitle; first word becomes the badge chip
 *   year         string   Displayed right-aligned in the card footer
 *   color        string   Hex accent — drives the gradient, orb, badge, and skeleton CTA colour
 *   span         int      Grid column width on a 12-col grid. Allowed values: 4 | 6 | 8 | 12
 *   url          string   href for the card link
 *
 * Grid tip — span values in each visual row should add up to 12:
 *   8 + 4  = 12  ← wide feature + small card
 *   4 + 4 + 4 = 12  ← three equal cards
 *   6 + 6  = 12  ← two halves
 *   12       = 12  ← full-width hero card
 */

$projects = [
    [
        'title'    => 'NovaCrypt Platform',
        'category' => 'Web Design · Development',
        'year'     => '2024',
        'color'    => '#6c47ff',
        'span'     => 8,
        'url'      => '/work/novacrypt',
    ],
    [
        'title'    => 'Verdant Identity',
        'category' => 'Branding · UI Design',
        'year'     => '2024',
        'color'    => '#00d4aa',
        'span'     => 4,
        'url'      => '/work/verdant',
    ],
    [
        'title'    => 'Apex Ecommerce',
        'category' => 'Web Design · CRO',
        'year'     => '2023',
        'color'    => '#ff4757',
        'span'     => 4,
        'url'      => '/work/apex',
    ],
    [
        'title'    => 'DataPulse Analytics Dashboard',
        'category' => 'UI/UX Design · Development',
        'year'     => '2023',
        'color'    => '#3b82f6',
        'span'     => 8,
        'url'      => '/work/datapulse',
    ],
    // ── Add more projects here — the loop handles everything else ──
    // [
    //     'title'    => 'Project Name',
    //     'category' => 'Category · Sub-category',
    //     'year'     => '2025',
    //     'color'    => '#f59e0b',
    //     'span'     => 6,
    //     'url'      => '/work/project-slug',
    // ],
];

/**
 * Stagger delay cycle: cards animate in with a small offset so they
 * don't all pop in simultaneously. Cycles every 3 cards.
 */
$delay_cycle = [0, 0.1, 0.2];
?>

<!-- ═══════════════════════════════ WORK ════════════════════════════════ -->
<section class="work" id="work">
    <div class="section-header reveal-up">
        <span class="section-tag">Featured Work</span>
        <h2 class="section-title">Proof in pixels.</h2>
    </div>

    <div class="work__grid">

        <?php foreach ($projects as $i => $project):
            $delay        = $delay_cycle[$i % count($delay_cycle)];
            $span_class   = 'work-card--span-' . (int) $project['span'];
            $accent_color = htmlspecialchars($project['color'], ENT_QUOTES);
            $badge_label  = htmlspecialchars(explode(' ', $project['category'])[0], ENT_QUOTES);
            $title        = htmlspecialchars($project['title'], ENT_QUOTES);
            $category     = htmlspecialchars($project['category'], ENT_QUOTES);
            $year         = htmlspecialchars($project['year'], ENT_QUOTES);
            $url          = htmlspecialchars($project['url'], ENT_QUOTES);
        ?>

        <article
            class="work-card <?= $span_class ?> reveal-up"
            style="--accent-color: <?= $accent_color ?>; --delay: <?= $delay ?>s"
        >
            <a href="<?= $url ?>" class="work-card__media">
                <div class="work-card__placeholder">
                    <div class="wc-deco wc-deco--orb"></div>
                    <div class="wc-deco wc-deco--lines">
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <div class="wc-deco wc-deco--badge"><?= $badge_label ?></div>
                </div>
                <div class="work-card__hover-overlay">
                    <span class="work-card__view">View Project ↗</span>
                </div>
            </a>
            <div class="work-card__info">
                <div>
                    <h3 class="work-card__title"><?= $title ?></h3>
                    <span class="work-card__cat"><?= $category ?></span>
                </div>
                <span class="work-card__year"><?= $year ?></span>
            </div>
        </article>

        <?php endforeach; ?>

    </div>

    <div class="work__footer reveal-up">
        <a href="/work" class="btn btn--outline">View All Projects →</a>
    </div>
</section>
