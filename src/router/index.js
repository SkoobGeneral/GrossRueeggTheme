import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '../views/Home.vue'
import ReferenceArchive from '../views/ReferenceArchive.vue'
import ReferenceSingle from '../views/ReferenceSingle.vue'
import AssetArchive from '../views/AssetArchive.vue'
import AssetSingle from '../views/AssetSingle.vue'
import NewsArchive from '../views/NewsArchive.vue'
import NewsSingle from '../views/NewsSingle.vue'
import TeamArchive from '../views/TeamArchive.vue'
import Contact from '../views/Contact.vue'
import Services from '../views/Services.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/404.vue'
//Components
import Post from '../components/Post/Post.vue'
import Page from '../components/Page/Page.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'fade',
      }
    },
    /*{
      // Assuming you're using the default permalink structure for posts
      path: '/:year/:month/:day/:postSlug',
      name: 'Post',
      component: Post,
      meta: {
        title: 'Post | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
      },
      transitionName: 'slide'
    },*/
    {
      path: '/referenzen',
      name: 'ReferenceArchive',
      component: ReferenceArchive,
      meta: {
        title: 'Referenzen | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right',
      }
    },
    {
      path: '/referenzen/:referenceSlug',
      name: 'ReferenceSingle',
      component: ReferenceSingle,
      meta: {
        title: 'Referenzen Single | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-left'
      }
    },
    {
      path: '/immobilien',
      name: 'AssetArchive',
      component: AssetArchive,
      meta: {
        title: 'Immobilien | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right'
      }
    },
    {
      path: '/immobilien/:immobilienSlug',
      name: 'AssetSingle',
      component: AssetSingle,
      meta: {
        title: 'Immobilien | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-left'
      },
    },
    {
      path: '/news',
      name: 'NewsArchive',
      component: NewsArchive,
      meta: {
        title: 'News | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right'
      }
    },
    {
      path: '/news/:newsSlug',
      name: 'NewsSingle',
      component: NewsSingle,
      meta: {
        title: 'News | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-left'
      }
    },
    {
      path: '/team',
      name: 'TeamArchive',
      component: TeamArchive,
      meta: {
      title: 'Team | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right'
      }
    },
    {
      path: '/team/*',
      redirect: '/team'
    },
    {
      path: '/leistungen',
      name: 'Services',
      component: Services,
      meta: {
        title: 'Leistungen | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right'
      }
    },
    {
      path: '/leistungen/*',
      redirect: '/leistungen'
    },
    {
      path: '/kontakt',
      name: 'Contact',
      component: Contact,
      meta: {
        title: 'Kontakt | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'slide-right'
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        title: 'Search | GrossRueegg',
        metaTags: [
          {
            name: 'description',
            content: 'Some content.'
          }
        ],
        transitionName: 'fade'
      }
    },
    /*{
      path: '/:pageSlug',
      name: 'Page',
      component: Page
    },*/
    { path: '/*', component: NotFound },
  ],
  mode: 'history',
  base: '',

  // Prevents window from scrolling back to top
  // when navigating between components/views
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
/*
for (var key in wp.routes) {
    var route = wp.routes[key];
    router.on(route.slug, {
        component: Vue.component(capitalize(route.type)),
        postId: route.id
    });
}
*/
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});


export default router
