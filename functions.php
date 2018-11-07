<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
    wp_enqueue_style('blankslate/app.css', get_template_directory_uri() . '/dist/styles/app.css', false, null);
    wp_enqueue_script('blankslate/manifest.js', get_template_directory_uri() . '/dist/scripts/manifest.js', null, null, true);
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri() . '/dist/scripts/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/app.js', get_template_directory_uri() . '/dist/scripts/app.js', null, null, true);
    wp_localize_script( 'rest-theme-vue', 'wp', array(
        'root'      => esc_url_raw( rest_url() ),
        'nonce'     => wp_create_nonce( 'wp_rest' ),
        'site_name' => get_bloginfo( 'name' ),
        'routes'    => rest_theme_routes(),
    ) );
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

function wpb_add_google_fonts() {
 
wp_enqueue_style( 'wpb-google-fonts', 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:100,300,400,700', false ); 
}
 
add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );

function pietergoosen_theme_setup() {
  register_nav_menus( array( 
    'header' => 'Header menu'
  ) );
 }

add_action( 'after_setup_theme', 'pietergoosen_theme_setup' );


function rest_theme_routes() {
    $routes = array();

    $query = new WP_Query( array(
        'post_type'      => 'any',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
    ) );
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $routes[] = array(
                'id'   => get_the_ID(),
                'type' => get_post_type(),
                'slug' => basename( get_permalink() ),
            );
        }
    }
    wp_reset_postdata();

    return $routes;
}