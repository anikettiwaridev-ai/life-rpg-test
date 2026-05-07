console.log("NEW SKILL TREE LOADED");
// ============================================================
// MASTER SKILLS TREE — LIFE RPG SYSTEM
// ============================================================
// All 10 Domains. ~1500+ skills. Ready for import.
//
// SHARED PRIMITIVE IDs (sync across ALL domains):
//   variables, data_types, conditionals, loops, functions,
//   arrays, objects, error_handling, debugging
//
// LANGUAGE PRIMARY HOMES:
//   JavaScript    → Web Development
//   Python        → Python & Automation
//   C++ / Java    → DSA & Computer Science
//   SQL           → Data Science & Analytics
//
// DOMAIN LIST:
//   1. Web Development
//   2. DSA & Computer Science
//   3. Python & Automation
//   4. AI & Machine Learning
//   5. Data Science & Analytics
//   6. Cybersecurity
//   7. DevOps & Infrastructure
//   8. System Design & Architecture
//   9. Visualization & Graphics
//  10. Product, UX & Communication
// ============================================================


// ============================================================
// DOMAIN 1: WEB DEVELOPMENT
// ============================================================

const webDevelopmentDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // HTML
      // ─────────────────────────────────────────────
      "HTML": {
        levels: {

          "Level 1 - Foundations": {
            sections: {
              "Document Structure": [
                { id: "html_how_web_works",       name: "How the Web Works",                xp: 10 },
                { id: "html_client_server",       name: "Client-Server Architecture",       xp: 10, course: "sigma" },
                { id: "html_structure",           name: "HTML Document Structure",          xp: 10, course: "sigma" },
                { id: "html_head_body",           name: "Head and Body Elements",           xp: 10 },
                { id: "html_comments",            name: "HTML Comments",                    xp: 10 },
                { id: "html_doctype",             name: "Doctype & Browser Rendering",      xp: 10 },
              ],
              "Text & Inline Content": [
                { id: "html_headings",            name: "Headings",                         xp: 10, course: "sigma" },
                { id: "html_paragraphs",          name: "Paragraphs & Line Breaks",         xp: 10, course: "sigma" },
                { id: "html_text_formatting",     name: "Text Formatting Elements",         xp: 10 },
                { id: "html_block_inline",        name: "Block vs Inline Elements",         xp: 10, course: "sigma" },
                { id: "html_entities",            name: "HTML Entities & Special Characters", xp: 10 },
              ],
            },
          },

          "Level 2 - Content & Media": {
            sections: {
              "Links & Media": [
                { id: "html_links",               name: "Anchor Links & Paths",             xp: 10, course: "sigma" },
                { id: "html_images",              name: "Images & Alt Text",                xp: 10, course: "sigma" },
                { id: "html_audio",               name: "Audio Element",                    xp: 10 },
                { id: "html_video",               name: "Video Element",                    xp: 10 },
                { id: "html_iframe",              name: "Iframes & Embeds",                 xp: 10 },
                { id: "html_picture",             name: "Picture & Responsive Images",      xp: 10 },
              ],
              "Lists & Tables": [
                { id: "html_lists",               name: "Ordered & Unordered Lists",        xp: 10, course: "sigma" },
                { id: "html_nested_lists",        name: "Nested Lists",                     xp: 10 },
                { id: "html_tables",              name: "Tables",                           xp: 10, course: "sigma" },
                { id: "html_table_advanced",      name: "Table Sections & Spanning",        xp: 10 },
                { id: "html_description_list",    name: "Description Lists",                xp: 10 },
              ],
            },
          },

          "Level 3 - Forms & Semantics": {
            sections: {
              "Forms": [
                { id: "html_forms",               name: "Forms & Form Structure",           xp: 25, course: "sigma" },
                { id: "html_inputs",              name: "Input Types",                      xp: 25, course: "sigma" },
                { id: "html_form_validation",     name: "HTML Form Validation",             xp: 25 },
                { id: "html_form_attributes",     name: "Form Attributes & Methods",        xp: 10 },
                { id: "html_textarea_select",     name: "Textarea, Select & Datalist",      xp: 10 },
                { id: "html_fieldset_label",      name: "Fieldset, Legend & Labels",        xp: 10 },
              ],
              "Semantic HTML": [
                { id: "semantic_html",            name: "Semantic HTML",                    xp: 10, course: "sigma" },
                { id: "html_accessibility",       name: "Accessibility Basics (ARIA)",      xp: 10 },
                { id: "html_meta_tags",           name: "Meta Tags & SEO Basics",           xp: 10 },
                { id: "html_data_attributes",     name: "Data Attributes",                  xp: 10 },
                { id: "html_canvas_svg_intro",    name: "Canvas & SVG Intro",               xp: 10 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // CSS
      // ─────────────────────────────────────────────
      "CSS": {
        levels: {

          "Level 1 - CSS Basics": {
            sections: {
              "Core Styling": [
                { id: "css_syntax",               name: "CSS Syntax & How CSS Works",       xp: 10, course: "sigma" },
                { id: "css_selectors",            name: "Selectors",                        xp: 10, course: "sigma" },
                { id: "css_specificity",          name: "Selector Specificity",             xp: 10, course: "sigma" },
                { id: "css_pseudo_classes",       name: "Pseudo-classes & Pseudo-elements", xp: 10 },
                { id: "css_combinators",          name: "Combinators",                      xp: 10 },
                { id: "css_cascade_inheritance",  name: "Cascade & Inheritance",            xp: 10 },
              ],
              "Visual Styling": [
                { id: "css_colors",               name: "Colors & Color Formats",           xp: 10, course: "sigma" },
                { id: "css_typography",           name: "Typography & Fonts",               xp: 10, course: "sigma" },
                { id: "css_units",                name: "CSS Units (px, em, rem, %)",       xp: 10, course: "sigma" },
                { id: "css_backgrounds",          name: "Backgrounds & Gradients",          xp: 10 },
                { id: "css_variables",            name: "CSS Custom Properties",            xp: 10 },
              ],
            },
          },

          "Level 2 - Box Model & Layout": {
            sections: {
              "Box Model": [
                { id: "css_box_model",            name: "Box Model",                        xp: 10, course: "sigma" },
                { id: "css_margin_padding",       name: "Margin and Padding",               xp: 10, course: "sigma" },
                { id: "css_borders",              name: "Borders & Outlines",               xp: 10 },
                { id: "css_display",              name: "Display Property",                 xp: 10, course: "sigma" },
                { id: "css_positioning",          name: "Positioning (static, relative, absolute, fixed, sticky)", xp: 10, course: "sigma" },
                { id: "css_z_index",              name: "Z-index & Stacking Context",       xp: 10 },
              ],
              "Flexbox": [
                { id: "flexbox_layout",           name: "Flexbox Layout",                   xp: 25, course: "sigma" },
                { id: "flex_alignment",           name: "Flex Alignment (justify, align)",  xp: 25, course: "sigma" },
                { id: "flex_properties",          name: "Flex Direction, Wrap & Sizing",    xp: 25, course: "sigma" },
                { id: "flex_order_grow",          name: "Flex Order, Grow & Shrink",        xp: 10 },
              ],
              "Grid": [
                { id: "css_grid_basics",          name: "CSS Grid Basics",                  xp: 25 },
                { id: "css_grid_advanced",        name: "Grid Template & Areas",            xp: 25 },
                { id: "css_grid_alignment",       name: "Grid Alignment & Gaps",            xp: 25 },
                { id: "css_grid_auto",            name: "Auto-fit, Auto-fill & Minmax",     xp: 25 },
              ],
            },
          },

          "Level 3 - Visual Effects & Responsive": {
            sections: {
              "Visual Effects": [
                { id: "css_transitions",          name: "CSS Transitions",                  xp: 25, course: "sigma" },
                { id: "css_transforms",           name: "CSS Transforms",                   xp: 25, course: "sigma" },
                { id: "css_animations",           name: "CSS Animations & Keyframes",       xp: 25 },
                { id: "css_shadows",              name: "Box & Text Shadows",               xp: 10 },
                { id: "css_overflow",             name: "Overflow & Clipping",              xp: 10 },
                { id: "css_filter_effects",       name: "CSS Filters & Blend Modes",        xp: 10 },
              ],
              "Responsive Design": [
                { id: "media_queries",            name: "Media Queries",                    xp: 25, course: "sigma" },
                { id: "mobile_first_design",      name: "Mobile First Design",              xp: 25 },
                { id: "responsive_layouts",       name: "Responsive Layouts",               xp: 25 },
                { id: "css_viewport",             name: "Viewport & Relative Units",        xp: 10, course: "sigma" },
                { id: "css_clamp_fluid",          name: "Fluid Typography with clamp()",    xp: 10 },
              ],
            },
          },

          "Level 4 - Frameworks & Architecture": {
            sections: {
              "Bootstrap": [
                { id: "bootstrap_intro",          name: "Bootstrap Grid System",            xp: 25, course: "sigma" },
                { id: "bootstrap_components",     name: "Bootstrap Components",             xp: 25, course: "sigma" },
                { id: "bootstrap_utilities",      name: "Bootstrap Utilities & Helpers",    xp: 10 },
                { id: "bootstrap_customize",      name: "Customizing Bootstrap",            xp: 10 },
              ],
              "Tailwind CSS": [
                { id: "tailwind_intro",           name: "Tailwind Fundamentals",            xp: 25, course: "sigma" },
                { id: "tailwind_components",      name: "Tailwind Components",              xp: 25, course: "sigma" },
                { id: "tailwind_responsive",      name: "Tailwind Responsive Design",       xp: 25, course: "sigma" },
                { id: "tailwind_customization",   name: "Tailwind Config & Custom Styles",  xp: 25 },
                { id: "tailwind_dark_mode",       name: "Dark Mode in Tailwind",            xp: 10 },
              ],
              "CSS Architecture": [
                { id: "css_bem",                  name: "BEM Naming Convention",            xp: 10 },
                { id: "css_modules",              name: "CSS Modules",                      xp: 25 },
                { id: "css_sass_basics",          name: "Sass / SCSS Basics",               xp: 25 },
                { id: "css_design_tokens",        name: "Design Tokens & Theming",          xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // JavaScript
      // ─────────────────────────────────────────────
      "JavaScript": {
        levels: {

          "Level 1 - Fundamentals": {
            sections: {
              "Programming Basics": [
                { id: "variables",                name: "Variables (var, let, const)",      xp: 10, course: "sigma" },
                { id: "data_types",               name: "Data Types",                       xp: 10, course: "sigma" },
                { id: "operators",                name: "Operators",                        xp: 10, course: "sigma" },
                { id: "conditionals",             name: "Conditional Statements",           xp: 10, course: "sigma" },
                { id: "loops",                    name: "Loops",                            xp: 10, course: "sigma" },
                { id: "functions",                name: "Functions",                        xp: 10, course: "sigma" },
              ],
              "Data Structures": [
                { id: "arrays",                   name: "Arrays",                           xp: 10, course: "sigma" },
                { id: "objects",                  name: "Objects",                          xp: 10, course: "sigma" },
                { id: "js_strings",               name: "String Methods",                   xp: 10, course: "sigma" },
                { id: "js_array_methods",         name: "Array Methods (map, filter, reduce)", xp: 25, course: "sigma" },
                { id: "js_object_methods",        name: "Object Methods & Iteration",       xp: 10 },
              ],
            },
          },

          "Level 2 - Intermediate JS": {
            sections: {
              "Language Concepts": [
                { id: "scope",                    name: "Scope",                            xp: 10, course: "sigma" },
                { id: "closures",                 name: "Closures",                         xp: 10, course: "sigma" },
                { id: "this_keyword",             name: "this Keyword",                     xp: 10, course: "sigma" },
                { id: "js_arrow_functions",       name: "Arrow Functions",                  xp: 10, course: "sigma" },
                { id: "js_iife",                  name: "IIFE",                             xp: 10, course: "sigma" },
                { id: "js_hoisting",              name: "Hoisting",                         xp: 10 },
              ],
              "ES6+ Features": [
                { id: "js_destructuring",         name: "Destructuring",                    xp: 10, course: "sigma" },
                { id: "js_spread_rest",           name: "Spread & Rest Operators",          xp: 10 },
                { id: "js_template_literals",     name: "Template Literals",                xp: 10, course: "sigma" },
                { id: "js_modules",               name: "ES Modules (import/export)",       xp: 10, course: "sigma" },
                { id: "js_optional_chaining",     name: "Optional Chaining & Nullish Coalescing", xp: 10 },
                { id: "js_shorthand_properties",  name: "Shorthand Properties & Computed Keys", xp: 10 },
              ],
              "OOP in JavaScript": [
                { id: "js_prototypes",            name: "Prototypes & Prototype Chain",     xp: 25, course: "sigma" },
                { id: "js_classes",               name: "Classes & Inheritance",            xp: 25, course: "sigma" },
                { id: "js_getters_setters",       name: "Getters & Setters",                xp: 10 },
              ],
              "Error Handling": [
                { id: "error_handling",           name: "Try / Catch / Finally",            xp: 10, course: "sigma" },
                { id: "debugging",                name: "Debugging JavaScript",             xp: 10, course: "sigma" },
                { id: "js_custom_errors",         name: "Custom Error Types",               xp: 10 },
              ],
            },
          },

          "Level 3 - Browser & DOM": {
            sections: {
              "DOM Manipulation": [
                { id: "dom_selection",            name: "DOM Selection",                    xp: 25, course: "sigma" },
                { id: "dom_manipulation",         name: "DOM Manipulation",                 xp: 25, course: "sigma" },
                { id: "event_listeners",          name: "Event Listeners",                  xp: 25, course: "sigma" },
                { id: "js_dom_events",            name: "DOM Event Types & Bubbling",       xp: 25, course: "sigma" },
                { id: "js_dom_traversal",         name: "DOM Traversal",                    xp: 10 },
                { id: "js_mutation_observer",     name: "MutationObserver",                 xp: 10 },
              ],
              "Browser APIs": [
                { id: "js_local_storage",         name: "LocalStorage & SessionStorage",    xp: 10, course: "sigma" },
                { id: "js_fetch_api",             name: "Fetch API",                        xp: 25, course: "sigma" },
                { id: "js_history_api",           name: "History API",                      xp: 10 },
                { id: "js_geolocation",           name: "Geolocation API",                  xp: 10 },
                { id: "js_web_notifications",     name: "Notifications & Web APIs",         xp: 10 },
                { id: "js_intersection_observer", name: "IntersectionObserver",             xp: 10 },
              ],
            },
          },

          "Level 4 - Async JavaScript": {
            sections: {
              "Asynchronous Programming": [
                { id: "callbacks",                name: "Callbacks",                        xp: 25, course: "sigma" },
                { id: "promises",                 name: "Promises",                         xp: 25, course: "sigma" },
                { id: "async_await",              name: "Async / Await",                    xp: 25, course: "sigma" },
                { id: "js_event_loop",            name: "Event Loop",                       xp: 25, course: "sigma" },
                { id: "js_promise_all",           name: "Promise.all, race & allSettled",   xp: 25 },
              ],
              "AJAX & APIs": [
                { id: "js_ajax",                  name: "AJAX Concepts",                    xp: 25, course: "sigma" },
                { id: "js_json_handling",         name: "JSON Handling in JS",              xp: 10, course: "sigma" },
                { id: "js_error_handling_async",  name: "Async Error Handling",             xp: 25 },
                { id: "js_axios",                 name: "Axios Library",                    xp: 25 },
              ],
            },
          },

          "Level 5 - Advanced JS": {
            sections: {
              "Advanced Concepts": [
                { id: "js_generators",            name: "Generators & Iterators",           xp: 25 },
                { id: "js_proxy_reflect",         name: "Proxy & Reflect",                  xp: 25 },
                { id: "js_web_workers",           name: "Web Workers",                      xp: 25 },
                { id: "js_performance",           name: "JS Performance Optimization",      xp: 25 },
                { id: "js_memory_management",     name: "Memory Management & Leaks",        xp: 25 },
              ],
              "Design Patterns": [
                { id: "js_design_patterns",       name: "Common JS Design Patterns",        xp: 40 },
                { id: "js_functional",            name: "Functional Programming Concepts",  xp: 40 },
                { id: "js_immutability",          name: "Immutability & Pure Functions",    xp: 25 },
              ],
              "Modern Tooling": [
                { id: "js_bundlers",              name: "Bundlers (Vite, Webpack)",         xp: 25 },
                { id: "js_linting",               name: "Linting & Formatting (ESLint, Prettier)", xp: 10 },
                { id: "js_typescript_intro",      name: "Why TypeScript Exists",            xp: 10 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // TypeScript
      // ─────────────────────────────────────────────
      "TypeScript": {
        levels: {

          "Level 1 - TypeScript Basics": {
            sections: {
              "Core Types": [
                { id: "ts_types",                 name: "Basic Types",                      xp: 10 },
                { id: "ts_interfaces",            name: "Interfaces",                       xp: 10 },
                { id: "ts_type_alias",            name: "Type Aliases",                     xp: 10 },
                { id: "ts_functions",             name: "Typed Functions",                  xp: 10 },
                { id: "ts_enums",                 name: "Enums",                            xp: 10 },
                { id: "ts_arrays_tuples",         name: "Arrays & Tuples in TS",            xp: 10 },
              ],
            },
          },

          "Level 2 - Advanced Types": {
            sections: {
              "Type System": [
                { id: "ts_generics",              name: "Generics",                         xp: 25 },
                { id: "ts_union_types",           name: "Union & Intersection Types",       xp: 25 },
                { id: "ts_utility_types",         name: "Utility Types (Partial, Pick, Omit)", xp: 25 },
                { id: "ts_type_guards",           name: "Type Guards & Narrowing",          xp: 25 },
                { id: "ts_mapped_types",          name: "Mapped & Conditional Types",       xp: 25 },
                { id: "ts_template_literal_types", name: "Template Literal Types",          xp: 25 },
              ],
            },
          },

          "Level 3 - TypeScript in Practice": {
            sections: {
              "Real-world TS": [
                { id: "ts_classes",               name: "Classes in TypeScript",            xp: 25 },
                { id: "ts_modules",               name: "Modules & Namespaces",             xp: 25 },
                { id: "ts_config",                name: "tsconfig & Compiler Options",      xp: 25 },
                { id: "ts_with_react",            name: "TypeScript with React",            xp: 40 },
                { id: "ts_declaration_files",     name: "Declaration Files (.d.ts)",        xp: 25 },
                { id: "ts_strict_mode",           name: "Strict Mode & Best Practices",     xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // React
      // ─────────────────────────────────────────────
      "React": {
        levels: {

          "Level 1 - React Fundamentals": {
            sections: {
              "Core Concepts": [
                { id: "react_components",         name: "React Components",                 xp: 25, course: "sigma" },
                { id: "react_props",              name: "Props & PropTypes",                xp: 25, course: "sigma" },
                { id: "react_state",              name: "State",                            xp: 25, course: "sigma" },
                { id: "react_lifecycle",          name: "Component Lifecycle",              xp: 25, course: "sigma" },
                { id: "react_jsx",                name: "JSX In Depth",                     xp: 10, course: "sigma" },
                { id: "react_conditional_render", name: "Conditional Rendering",            xp: 10, course: "sigma" },
              ],
              "Lists & Events": [
                { id: "react_lists_keys",         name: "Lists & Keys",                     xp: 10, course: "sigma" },
                { id: "react_events",             name: "Handling Events in React",         xp: 10, course: "sigma" },
                { id: "react_forms_basic",        name: "Controlled Components & Forms",    xp: 25 },
              ],
            },
          },

          "Level 2 - Hooks": {
            sections: {
              "Core Hooks": [
                { id: "use_state",                name: "useState",                         xp: 25, course: "sigma" },
                { id: "use_effect",               name: "useEffect",                        xp: 25, course: "sigma" },
                { id: "use_ref",                  name: "useRef",                           xp: 25 },
                { id: "use_memo",                 name: "useMemo & useCallback",            xp: 25 },
                { id: "use_reducer",              name: "useReducer",                       xp: 25 },
                { id: "use_context_hook",         name: "useContext",                       xp: 25 },
              ],
              "Custom Hooks": [
                { id: "react_custom_hooks",       name: "Custom Hooks",                     xp: 40 },
                { id: "react_hooks_rules",        name: "Rules of Hooks",                   xp: 10 },
                { id: "react_use_id",             name: "useId & other React 18 Hooks",     xp: 10 },
              ],
            },
          },

          "Level 3 - Advanced React": {
            sections: {
              "Architecture": [
                { id: "react_context",            name: "Context API",                      xp: 40, course: "sigma" },
                { id: "react_router",             name: "React Router",                     xp: 40, course: "sigma" },
                { id: "react_performance",        name: "React Performance Optimization",   xp: 40 },
                { id: "react_portals",            name: "Portals & Refs",                   xp: 25 },
                { id: "react_error_boundaries",   name: "Error Boundaries",                 xp: 25 },
                { id: "react_suspense",           name: "Suspense & Lazy Loading",          xp: 25 },
              ],
              "State Management": [
                { id: "react_redux",              name: "Redux & Redux Toolkit",            xp: 40 },
                { id: "react_zustand",            name: "Zustand",                          xp: 25 },
                { id: "react_jotai",              name: "Jotai / Recoil",                   xp: 25 },
              ],
              "Data Fetching": [
                { id: "react_query",              name: "TanStack Query (React Query)",     xp: 40 },
                { id: "react_forms",              name: "Form Handling (React Hook Form)",  xp: 25 },
                { id: "react_swr",                name: "SWR for Data Fetching",            xp: 25 },
              ],
            },
          },

          "Level 4 - Next.js": {
            sections: {
              "Next.js Fundamentals": [
                { id: "nextjs_basics",            name: "Next.js Setup & Pages Router",     xp: 40 },
                { id: "nextjs_app_router",        name: "App Router & Layouts",             xp: 40 },
                { id: "nextjs_routing",           name: "File-based Routing & Dynamic Routes", xp: 40 },
                { id: "nextjs_ssr_ssg",           name: "SSR, SSG & ISR",                   xp: 40 },
                { id: "nextjs_api_routes",        name: "API Routes",                       xp: 40 },
                { id: "nextjs_metadata",          name: "Metadata & SEO in Next.js",        xp: 25 },
              ],
              "Next.js Advanced": [
                { id: "nextjs_image",             name: "Next.js Image Optimization",       xp: 25 },
                { id: "nextjs_middleware",        name: "Middleware in Next.js",            xp: 40 },
                { id: "nextjs_auth",              name: "Auth in Next.js (NextAuth)",       xp: 40 },
                { id: "nextjs_deployment",        name: "Deploying Next.js on Vercel",      xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Node.js
      // ─────────────────────────────────────────────
      "Node.js": {
        levels: {

          "Level 1 - Node Fundamentals": {
            sections: {
              "Runtime Basics": [
                { id: "node_runtime",             name: "Node.js Runtime",                  xp: 25, course: "sigma" },
                { id: "node_event_loop",          name: "Node Event Loop",                  xp: 25, course: "sigma" },
                { id: "node_modules",             name: "Node Modules (CommonJS & ESM)",    xp: 25, course: "sigma" },
                { id: "node_npm",                 name: "npm & package.json",               xp: 25, course: "sigma" },
                { id: "node_path_os",             name: "Path & OS Modules",                xp: 10 },
                { id: "node_process",             name: "Process & argv",                   xp: 10 },
              ],
            },
          },

          "Level 2 - Backend Development": {
            sections: {
              "Server Basics": [
                { id: "http_server",              name: "HTTP Server",                      xp: 25, course: "sigma" },
                { id: "file_system_module",       name: "File System Module",               xp: 25, course: "sigma" },
                { id: "environment_variables",    name: "Environment Variables",            xp: 25, course: "sigma" },
                { id: "node_streams",             name: "Streams & Buffers",                xp: 25 },
                { id: "node_events",              name: "EventEmitter",                     xp: 25 },
                { id: "node_crypto",              name: "Crypto Module",                    xp: 25 },
              ],
            },
          },

          "Level 3 - Advanced Node": {
            sections: {
              "Advanced Patterns": [
                { id: "node_clustering",          name: "Clustering & Worker Threads",      xp: 40 },
                { id: "node_child_process",       name: "Child Processes",                  xp: 40 },
                { id: "node_security",            name: "Node.js Security Practices",       xp: 40 },
                { id: "node_performance",         name: "Node.js Performance Profiling",    xp: 40 },
                { id: "node_testing",             name: "Testing Node Applications",        xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Express
      // ─────────────────────────────────────────────
      "Express": {
        levels: {

          "Level 1 - Express Fundamentals": {
            sections: {
              "Routing & Middleware": [
                { id: "express_routing",          name: "Express Routing",                  xp: 25, course: "sigma" },
                { id: "express_middleware",       name: "Middleware",                       xp: 25, course: "sigma" },
                { id: "express_static",           name: "Serving Static Files",             xp: 10, course: "sigma" },
                { id: "express_template_engines", name: "Template Engines (EJS)",           xp: 25, course: "sigma" },
                { id: "express_req_res",          name: "Request & Response Objects",       xp: 25, course: "sigma" },
                { id: "express_params_query",     name: "Route Params & Query Strings",     xp: 10 },
              ],
            },
          },

          "Level 2 - API Development": {
            sections: {
              "REST APIs": [
                { id: "rest_api_design",          name: "REST API Design",                  xp: 40, course: "sigma" },
                { id: "api_error_handling",       name: "API Error Handling",               xp: 40, course: "sigma" },
                { id: "express_router",           name: "Express Router",                   xp: 25, course: "sigma" },
                { id: "express_validation",       name: "Input Validation (Joi/Zod)",       xp: 25 },
                { id: "express_cors",             name: "CORS",                             xp: 25, course: "sigma" },
                { id: "express_body_parser",      name: "Body Parser & File Uploads",       xp: 25 },
              ],
            },
          },

          "Level 3 - Advanced Express": {
            sections: {
              "Architecture & Security": [
                { id: "express_mvc",              name: "MVC Architecture",                 xp: 40, course: "sigma" },
                { id: "express_rate_limiting",    name: "Rate Limiting",                    xp: 25 },
                { id: "express_security",         name: "Express Security (Helmet)",        xp: 40 },
                { id: "express_logging",          name: "Logging (Morgan, Winston)",        xp: 25 },
                { id: "express_caching",          name: "Response Caching",                 xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Databases
      // ─────────────────────────────────────────────
      "Databases": {
        levels: {

          "Level 1 - Database Fundamentals": {
            sections: {
              "Core Concepts": [
                { id: "database_models",          name: "Database Models (Relational vs NoSQL)", xp: 25, course: "sigma" },
                { id: "database_crud",            name: "CRUD Operations",                  xp: 25, course: "sigma" },
                { id: "database_relationships",   name: "Relationships & Joins",            xp: 25, course: "sigma" },
                { id: "database_schema_design",   name: "Schema Design",                    xp: 40 },
                { id: "database_indexing",        name: "Database Indexing",                xp: 40 },
                { id: "database_normalization",   name: "Normalization",                    xp: 25 },
              ],
            },
          },

          "Level 2 - MongoDB": {
            sections: {
              "MongoDB Core": [
                { id: "mongodb",                  name: "MongoDB Setup & Overview",         xp: 25, course: "sigma" },
                { id: "mongodb_crud",             name: "MongoDB CRUD Operations",          xp: 25, course: "sigma" },
                { id: "mongodb_queries",          name: "Query Filtering & Operators",      xp: 25, course: "sigma" },
                { id: "mongodb_aggregation",      name: "Aggregation Pipeline",             xp: 40 },
                { id: "mongodb_indexing",         name: "Indexing in MongoDB",              xp: 40 },
                { id: "mongodb_atlas",            name: "MongoDB Atlas & Cloud",            xp: 25 },
              ],
              "Mongoose": [
                { id: "mongoose_setup",           name: "Mongoose Setup & Connection",      xp: 25, course: "sigma" },
                { id: "mongoose_schemas",         name: "Mongoose Schemas & Models",        xp: 25, course: "sigma" },
                { id: "mongoose_validation",      name: "Mongoose Validation",              xp: 25 },
                { id: "mongoose_populate",        name: "Populate & References",            xp: 40, course: "sigma" },
                { id: "mongoose_middleware",      name: "Mongoose Middleware (Hooks)",      xp: 25 },
                { id: "mongoose_virtuals",        name: "Virtuals & Query Helpers",         xp: 25 },
              ],
            },
          },

          "Level 3 - PostgreSQL": {
            sections: {
              "PostgreSQL Core": [
                { id: "postgresql",               name: "PostgreSQL Setup",                 xp: 25 },
                { id: "postgresql_advanced_sql",  name: "Advanced SQL Queries",             xp: 40 },
                { id: "postgresql_transactions",  name: "Transactions & ACID",              xp: 40 },
                { id: "postgresql_orm",           name: "ORM with Prisma",                  xp: 40 },
                { id: "postgresql_views",         name: "Views & Stored Procedures",        xp: 40 },
                { id: "postgresql_performance",   name: "PostgreSQL Performance Tuning",    xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Authentication
      // ─────────────────────────────────────────────
      "Authentication": {
        levels: {

          "Level 1 - Auth Fundamentals": {
            sections: {
              "Core Auth Concepts": [
                { id: "auth_concepts",            name: "Authentication vs Authorization",  xp: 25, course: "sigma" },
                { id: "password_hashing",         name: "Password Hashing (bcrypt)",        xp: 25, course: "sigma" },
                { id: "jwt_auth",                 name: "JWT Authentication",               xp: 40, course: "sigma" },
                { id: "session_auth",             name: "Session Authentication",           xp: 40, course: "sigma" },
                { id: "auth_cookies",             name: "Cookies & Tokens",                 xp: 25, course: "sigma" },
                { id: "auth_signup_login",        name: "Signup & Login Flow",              xp: 25, course: "sigma" },
              ],
            },
          },

          "Level 2 - Advanced Auth": {
            sections: {
              "Auth Patterns": [
                { id: "oauth",                    name: "OAuth 2.0",                        xp: 40 },
                { id: "auth_social_login",        name: "Social Login (Google, GitHub)",    xp: 40 },
                { id: "rbac",                     name: "Role-Based Access Control",        xp: 40, course: "sigma" },
                { id: "auth_middleware",          name: "Auth Middleware & Guards",         xp: 25, course: "sigma" },
                { id: "refresh_tokens",           name: "Refresh Tokens",                   xp: 25 },
                { id: "auth_2fa",                 name: "Two-Factor Authentication",        xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // APIs
      // ─────────────────────────────────────────────
      "APIs": {
        levels: {

          "Level 1 - API Fundamentals": {
            sections: {
              "API Concepts": [
                { id: "http_methods",             name: "HTTP Methods",                     xp: 25, course: "sigma" },
                { id: "api_request_response",     name: "Request / Response Structure",     xp: 25, course: "sigma" },
                { id: "api_status_codes",         name: "HTTP Status Codes",                xp: 10 },
                { id: "api_headers",              name: "Headers & Content Types",          xp: 10 },
                { id: "api_authentication",       name: "API Authentication Methods",       xp: 25 },
                { id: "api_keys_env",             name: "API Keys & Environment Protection", xp: 10 },
              ],
            },
          },

          "Level 2 - Modern APIs": {
            sections: {
              "Advanced APIs": [
                { id: "graphql",                  name: "GraphQL",                          xp: 40 },
                { id: "api_versioning",           name: "API Versioning",                   xp: 40 },
                { id: "api_pagination",           name: "Pagination & Filtering",           xp: 25 },
                { id: "api_webhooks",             name: "Webhooks",                         xp: 25 },
                { id: "api_rate_limiting",        name: "Rate Limiting & Throttling",       xp: 25 },
                { id: "websockets",               name: "WebSockets & Real-time APIs",      xp: 40 },
              ],
            },
          },

          "Level 3 - API Design Mastery": {
            sections: {
              "Design & Documentation": [
                { id: "api_design_principles",    name: "API Design Principles",            xp: 40 },
                { id: "api_documentation",        name: "API Documentation (OpenAPI/Swagger)", xp: 40 },
                { id: "api_testing",              name: "API Testing (Postman/Thunder)",    xp: 25 },
                { id: "api_trpc",                 name: "tRPC",                             xp: 40 },
                { id: "api_caching_strategy",     name: "API Caching Strategies",           xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Testing
      // ─────────────────────────────────────────────
      "Testing": {
        levels: {

          "Level 1 - Testing Basics": {
            sections: {
              "Test Concepts": [
                { id: "unit_testing",             name: "Unit Testing",                     xp: 25 },
                { id: "integration_testing",      name: "Integration Testing",              xp: 25 },
                { id: "e2e_testing",              name: "End-to-End Testing Concepts",      xp: 25 },
                { id: "tdd",                      name: "Test-Driven Development",          xp: 40 },
                { id: "test_coverage",            name: "Test Coverage",                    xp: 25 },
              ],
            },
          },

          "Level 2 - Testing Tools": {
            sections: {
              "JS Testing Tools": [
                { id: "jest_testing",             name: "Jest",                             xp: 25 },
                { id: "testing_library",          name: "Testing Library",                  xp: 25 },
                { id: "vitest",                   name: "Vitest",                           xp: 25 },
                { id: "cypress",                  name: "Cypress",                          xp: 40 },
                { id: "supertest",                name: "Supertest (API Testing)",          xp: 25 },
                { id: "playwright",               name: "Playwright",                       xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Web Security
      // ─────────────────────────────────────────────
      "Web Security": {
        levels: {

          "Level 1 - Security Fundamentals": {
            sections: {
              "Common Vulnerabilities": [
                { id: "xss",                      name: "Cross-Site Scripting (XSS)",       xp: 40 },
                { id: "csrf",                     name: "CSRF Protection",                  xp: 40 },
                { id: "sql_injection",            name: "SQL Injection",                    xp: 40 },
                { id: "security_headers",         name: "Security Headers",                 xp: 25 },
                { id: "https_tls",                name: "HTTPS & TLS",                      xp: 25 },
                { id: "cors_security",            name: "CORS Security",                    xp: 25 },
              ],
            },
          },

          "Level 2 - Secure Development": {
            sections: {
              "Secure Practices": [
                { id: "input_sanitization",       name: "Input Sanitization",               xp: 25 },
                { id: "web_rate_limiting",        name: "Rate Limiting",                    xp: 25 },
                { id: "env_secrets",              name: "Secrets & Environment Management", xp: 25 },
                { id: "dependency_security",      name: "Dependency Auditing",              xp: 25 },
                { id: "owasp_top10",              name: "OWASP Top 10",                     xp: 40 },
                { id: "web_pentest_intro",        name: "Intro to Web Penetration Testing", xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 2: DSA & COMPUTER SCIENCE
// ============================================================

const dsaComputerScienceDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // C++
      // ─────────────────────────────────────────────
      "C++": {
        levels: {

          "Level 1 - C++ Basics": {
            sections: {
              "Language Fundamentals": [
                { id: "cpp_syntax",               name: "C++ Syntax & First Program",       xp: 10, course: "sigma" },
                { id: "variables",                name: "Variables & Data Types",           xp: 10, course: "sigma" },
                { id: "operators",                name: "Operators",                        xp: 10, course: "sigma" },
                { id: "conditionals",             name: "Conditional Statements",           xp: 10, course: "sigma" },
                { id: "loops",                    name: "Loops",                            xp: 10, course: "sigma" },
                { id: "functions",                name: "Functions",                        xp: 10, course: "sigma" },
              ],
              "Core Constructs": [
                { id: "cpp_io",                   name: "Input / Output (cin, cout)",       xp: 10, course: "sigma" },
                { id: "arrays",                   name: "Arrays",                           xp: 10, course: "sigma" },
                { id: "cpp_strings",              name: "Strings in C++",                   xp: 10, course: "sigma" },
                { id: "cpp_2d_arrays",            name: "2D Arrays",                        xp: 10, course: "sigma" },
                { id: "cpp_patterns",             name: "Pattern Problems",                 xp: 10, course: "sigma" },
              ],
            },
          },

          "Level 2 - OOP in C++": {
            sections: {
              "Object-Oriented Programming": [
                { id: "cpp_classes_objects",      name: "Classes & Objects",                xp: 25, course: "sigma" },
                { id: "cpp_constructors",         name: "Constructors & Destructors",       xp: 25, course: "sigma" },
                { id: "cpp_inheritance",          name: "Inheritance",                      xp: 25, course: "sigma" },
                { id: "cpp_polymorphism",         name: "Polymorphism",                     xp: 25, course: "sigma" },
                { id: "cpp_abstraction",          name: "Abstraction & Encapsulation",      xp: 25, course: "sigma" },
                { id: "cpp_static",               name: "Static Members & Friend Functions", xp: 10 },
              ],
            },
          },

          "Level 3 - STL": {
            sections: {
              "Standard Template Library": [
                { id: "cpp_stl_vectors",          name: "Vectors",                          xp: 25, course: "sigma" },
                { id: "cpp_stl_maps",             name: "Maps & Unordered Maps",            xp: 25, course: "sigma" },
                { id: "cpp_stl_sets",             name: "Sets & Unordered Sets",            xp: 25, course: "sigma" },
                { id: "cpp_stl_pairs",            name: "Pairs & Tuples",                   xp: 10 },
                { id: "cpp_stl_iterators",        name: "Iterators",                        xp: 25 },
                { id: "cpp_stl_algorithms",       name: "STL Algorithms (sort, find, etc)", xp: 25, course: "sigma" },
              ],
            },
          },

          "Level 4 - Advanced C++": {
            sections: {
              "Advanced Concepts": [
                { id: "cpp_pointers",             name: "Pointers & References",            xp: 40 },
                { id: "cpp_memory",               name: "Memory Management (new, delete)",  xp: 40 },
                { id: "cpp_templates",            name: "Templates",                        xp: 40 },
                { id: "cpp_smart_pointers",       name: "Smart Pointers",                   xp: 40 },
                { id: "cpp_lambdas",              name: "Lambda Expressions",               xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Java
      // ─────────────────────────────────────────────
      "Java": {
        levels: {

          "Level 1 - Java Basics": {
            sections: {
              "Language Fundamentals": [
                { id: "java_syntax",              name: "Java Syntax & First Program",      xp: 10, course: "sigma" },
                { id: "variables",                name: "Variables & Data Types",           xp: 10, course: "sigma" },
                { id: "operators",                name: "Operators",                        xp: 10, course: "sigma" },
                { id: "conditionals",             name: "Conditional Statements",           xp: 10, course: "sigma" },
                { id: "loops",                    name: "Loops",                            xp: 10, course: "sigma" },
                { id: "functions",                name: "Methods & Functions",              xp: 10, course: "sigma" },
              ],
              "Core Constructs": [
                { id: "java_io",                  name: "Input / Output (Scanner)",         xp: 10, course: "sigma" },
                { id: "arrays",                   name: "Arrays",                           xp: 10, course: "sigma" },
                { id: "java_strings",             name: "Strings & StringBuilder",          xp: 10, course: "sigma" },
                { id: "java_2d_arrays",           name: "2D Arrays",                        xp: 10, course: "sigma" },
                { id: "java_patterns",            name: "Pattern Problems",                 xp: 10, course: "sigma" },
              ],
            },
          },

          "Level 2 - OOP in Java": {
            sections: {
              "Object-Oriented Programming": [
                { id: "java_classes_objects",     name: "Classes & Objects",                xp: 25, course: "sigma" },
                { id: "java_constructors",        name: "Constructors",                     xp: 25, course: "sigma" },
                { id: "java_inheritance",         name: "Inheritance",                      xp: 25, course: "sigma" },
                { id: "java_polymorphism",        name: "Polymorphism",                     xp: 25, course: "sigma" },
                { id: "java_abstraction",         name: "Abstraction & Interfaces",         xp: 25, course: "sigma" },
                { id: "java_encapsulation",       name: "Encapsulation",                    xp: 25, course: "sigma" },
              ],
            },
          },

          "Level 3 - Collections Framework": {
            sections: {
              "Java Collections": [
                { id: "java_arraylist",           name: "ArrayList & LinkedList",           xp: 25, course: "sigma" },
                { id: "java_hashmap",             name: "HashMap & TreeMap",                xp: 25, course: "sigma" },
                { id: "java_hashset",             name: "HashSet & TreeSet",                xp: 25, course: "sigma" },
                { id: "java_queue_deque",         name: "Queue & Deque",                    xp: 25, course: "sigma" },
                { id: "java_stack_class",         name: "Stack Class",                      xp: 10, course: "sigma" },
                { id: "java_iterators",           name: "Iterators & Enhanced For",         xp: 10 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // DSA Core (Language-agnostic)
      // ─────────────────────────────────────────────
      "DSA Core": {
        levels: {

          "Level 1 - Foundations": {
            sections: {
              "Complexity & Recursion": [
                { id: "time_complexity",          name: "Time Complexity Analysis",         xp: 40, course: "sigma" },
                { id: "space_complexity",         name: "Space Complexity Analysis",        xp: 40, course: "sigma" },
                { id: "recursion",                name: "Recursion",                        xp: 40, course: "sigma" },
                { id: "recursion_trees",          name: "Recursion Trees & Backtracking",   xp: 40, course: "sigma" },
                { id: "bit_manipulation",         name: "Bit Manipulation",                 xp: 40, course: "sigma" },
                { id: "math_for_dsa",             name: "Math for DSA (GCD, Primes, Mod)", xp: 25 },
              ],
            },
          },

          "Level 2 - Sorting & Searching": {
            sections: {
              "Sorting Algorithms": [
                { id: "bubble_sort",              name: "Bubble Sort",                      xp: 25, course: "sigma" },
                { id: "selection_sort",           name: "Selection Sort",                   xp: 25, course: "sigma" },
                { id: "insertion_sort",           name: "Insertion Sort",                   xp: 25, course: "sigma" },
                { id: "merge_sort",               name: "Merge Sort",                       xp: 40, course: "sigma" },
                { id: "quick_sort",               name: "Quick Sort",                       xp: 40, course: "sigma" },
                { id: "count_sort",               name: "Count Sort & Radix Sort",          xp: 25, course: "sigma" },
              ],
              "Searching": [
                { id: "linear_search",            name: "Linear Search",                    xp: 10, course: "sigma" },
                { id: "binary_search",            name: "Binary Search",                    xp: 25, course: "sigma" },
                { id: "binary_search_variants",   name: "Binary Search Variants",           xp: 40 },
              ],
            },
          },

          "Level 3 - Linear Structures": {
            sections: {
              "Linked Lists": [
                { id: "linked_lists",             name: "Linked Lists",                     xp: 40, course: "sigma" },
                { id: "ll_operations",            name: "LL Insert, Delete & Reverse",      xp: 40, course: "sigma" },
                { id: "ll_problems",              name: "LL Classic Problems",              xp: 40, course: "sigma" },
                { id: "doubly_linked_list",       name: "Doubly Linked List",               xp: 40 },
              ],
              "Stacks & Queues": [
                { id: "stacks",                   name: "Stacks",                           xp: 40, course: "sigma" },
                { id: "queues",                   name: "Queues",                           xp: 40, course: "sigma" },
                { id: "deque",                    name: "Deque & Circular Queue",           xp: 25, course: "sigma" },
                { id: "stack_queue_problems",     name: "Stack & Queue Problems",           xp: 40 },
              ],
            },
          },

          "Level 4 - Trees": {
            sections: {
              "Binary Trees": [
                { id: "binary_trees",             name: "Binary Trees",                     xp: 40, course: "sigma" },
                { id: "tree_traversals",          name: "Tree Traversals (DFS & BFS)",      xp: 40, course: "sigma" },
                { id: "tree_problems",            name: "Binary Tree Problems",             xp: 40, course: "sigma" },
                { id: "bst",                      name: "Binary Search Trees (BST)",        xp: 40, course: "sigma" },
                { id: "bst_operations",           name: "BST Insert, Delete & Search",      xp: 40, course: "sigma" },
              ],
              "Advanced Trees": [
                { id: "heaps",                    name: "Heaps & Priority Queues",          xp: 40, course: "sigma" },
                { id: "heap_sort",                name: "Heap Sort",                        xp: 40, course: "sigma" },
                { id: "tries",                    name: "Tries",                            xp: 40, course: "sigma" },
                { id: "segment_trees",            name: "Segment Trees",                    xp: 40, course: "sigma" },
                { id: "avl_trees",                name: "AVL Trees & Balanced BSTs",        xp: 40 },
              ],
            },
          },

          "Level 5 - Graphs": {
            sections: {
              "Graph Fundamentals": [
                { id: "graph_basics",             name: "Graph Basics & Representations",   xp: 40, course: "sigma" },
                { id: "graph_bfs",                name: "BFS",                              xp: 40, course: "sigma" },
                { id: "graph_dfs",                name: "DFS",                              xp: 40, course: "sigma" },
                { id: "graph_cycle",              name: "Cycle Detection",                  xp: 40, course: "sigma" },
                { id: "topological_sort",         name: "Topological Sort",                 xp: 40, course: "sigma" },
              ],
              "Shortest Paths & MST": [
                { id: "dijkstra",                 name: "Dijkstra's Algorithm",             xp: 40, course: "sigma" },
                { id: "bellman_ford",             name: "Bellman-Ford Algorithm",           xp: 40, course: "sigma" },
                { id: "kruskal",                  name: "Kruskal's Algorithm (MST)",        xp: 40, course: "sigma" },
                { id: "prim",                     name: "Prim's Algorithm (MST)",           xp: 40, course: "sigma" },
              ],
            },
          },

          "Level 6 - Advanced Algorithms": {
            sections: {
              "Greedy & Divide & Conquer": [
                { id: "greedy",                   name: "Greedy Algorithms",                xp: 40, course: "sigma" },
                { id: "divide_conquer",           name: "Divide & Conquer",                 xp: 40, course: "sigma" },
                { id: "backtracking",             name: "Backtracking",                     xp: 40, course: "sigma" },
              ],
              "Dynamic Programming": [
                { id: "dp_intro",                 name: "Dynamic Programming Intro",        xp: 40, course: "sigma" },
                { id: "dp_memoization",           name: "Memoization & Tabulation",         xp: 40, course: "sigma" },
                { id: "dp_1d",                    name: "1D DP Problems (Fibonacci, Climbing Stairs)", xp: 40, course: "sigma" },
                { id: "dp_2d",                    name: "2D DP Problems (Knapsack, LCS)",   xp: 40, course: "sigma" },
                { id: "dp_advanced",              name: "Advanced DP (MCM, Edit Distance)", xp: 40, course: "sigma" },
              ],
              "Problem Solving Patterns": [
                { id: "sliding_window",           name: "Sliding Window",                   xp: 40 },
                { id: "two_pointers",             name: "Two Pointers",                     xp: 40 },
                { id: "prefix_sum",               name: "Prefix Sum",                       xp: 40 },
                { id: "hashing_dsa",              name: "Hashing in DSA",                   xp: 40, course: "sigma" },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 3: PYTHON & AUTOMATION
// ============================================================

const pythonAutomationDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // Python Core
      // ─────────────────────────────────────────────
      "Python Core": {
        levels: {

          "Level 1 - Python Fundamentals": {
            sections: {
              "Programming Basics": [
                { id: "py_intro",                 name: "Python Setup & First Program",     xp: 10 },
                { id: "variables",                name: "Variables & Data Types",           xp: 10 },
                { id: "operators",                name: "Operators",                        xp: 10 },
                { id: "conditionals",             name: "Conditional Statements",           xp: 10 },
                { id: "loops",                    name: "Loops (for, while)",               xp: 10 },
                { id: "functions",                name: "Functions",                        xp: 10 },
              ],
              "Core Python": [
                { id: "py_strings",               name: "Strings & String Methods",         xp: 10 },
                { id: "py_input_output",          name: "Input & Output",                   xp: 10 },
                { id: "error_handling",           name: "Error Handling (try/except)",      xp: 10 },
                { id: "debugging",                name: "Debugging Python",                 xp: 10 },
                { id: "py_type_conversion",       name: "Type Conversion & Casting",        xp: 10 },
              ],
            },
          },

          "Level 2 - Data Structures": {
            sections: {
              "Built-in Data Structures": [
                { id: "py_lists",                 name: "Lists & List Methods",             xp: 10 },
                { id: "py_tuples",                name: "Tuples",                           xp: 10 },
                { id: "py_dicts",                 name: "Dictionaries & Dictionary Methods", xp: 10 },
                { id: "py_sets",                  name: "Sets & Set Operations",            xp: 10 },
                { id: "py_nested",                name: "Nested Data Structures",           xp: 25 },
                { id: "py_comprehensions",        name: "List & Dict Comprehensions",       xp: 25 },
              ],
            },
          },

          "Level 3 - Intermediate Python": {
            sections: {
              "OOP in Python": [
                { id: "py_classes",               name: "Classes & Objects",                xp: 25 },
                { id: "py_inheritance",           name: "Inheritance & Polymorphism",       xp: 25 },
                { id: "py_dunder",                name: "Dunder Methods",                   xp: 25 },
                { id: "py_dataclasses",           name: "Dataclasses",                      xp: 25 },
              ],
              "Modules & Packages": [
                { id: "py_modules",               name: "Modules & Imports",                xp: 10 },
                { id: "py_packages",              name: "Packages & pip",                   xp: 10 },
                { id: "py_venv",                  name: "Virtual Environments",             xp: 10 },
                { id: "py_stdlib",                name: "Python Standard Library Overview", xp: 25 },
                { id: "py_reading_docs",          name: "Reading Library Documentation",    xp: 10 },
              ],
            },
          },

          "Level 4 - Advanced Python": {
            sections: {
              "Advanced Features": [
                { id: "py_decorators",            name: "Decorators",                       xp: 40 },
                { id: "py_generators",            name: "Generators & Iterators",           xp: 40 },
                { id: "py_context_managers",      name: "Context Managers (with statement)", xp: 25 },
                { id: "py_regex",                 name: "Regular Expressions (re module)",  xp: 40 },
                { id: "py_functools",             name: "functools (partial, lru_cache)",   xp: 25 },
                { id: "py_typing",                name: "Type Hints & typing module",       xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Python File & OS Automation
      // ─────────────────────────────────────────────
      "Python File & OS Automation": {
        levels: {

          "Level 1 - OS & Files": {
            sections: {
              "File Handling": [
                { id: "py_file_handling",         name: "File Handling (read, write, append)", xp: 25 },
                { id: "py_os_module",             name: "OS Module",                        xp: 25 },
                { id: "py_shutil",                name: "shutil (copy, move, delete)",      xp: 25 },
                { id: "py_pathlib",               name: "pathlib",                          xp: 25 },
                { id: "py_folder_management",     name: "Folder Management & Organization", xp: 25 },
              ],
              "Data Formats": [
                { id: "py_csv",                   name: "Working with CSV Files",           xp: 25 },
                { id: "py_json",                  name: "Working with JSON",                xp: 25 },
                { id: "py_datetime",              name: "Date and Time (datetime module)",  xp: 25 },
                { id: "py_xml",                   name: "Parsing XML & HTML",               xp: 25 },
              ],
            },
          },

          "Level 2 - System Automation": {
            sections: {
              "Automation": [
                { id: "py_subprocess",            name: "subprocess Module",                xp: 40 },
                { id: "py_scheduled_tasks",       name: "Scheduled Tasks (schedule lib)",  xp: 25 },
                { id: "py_file_automation",       name: "File Automation Scripts",          xp: 25 },
                { id: "py_downloads_cleanup",     name: "Organizing Downloads & Cleanup",   xp: 25 },
                { id: "py_open_apps",             name: "Opening Applications from Python", xp: 25 },
                { id: "py_logging",               name: "Logging in Python",                xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Python Networking & APIs
      // ─────────────────────────────────────────────
      "Python Networking & APIs": {
        levels: {

          "Level 1 - HTTP & APIs": {
            sections: {
              "API Requests": [
                { id: "py_http_basics",           name: "HTTP Methods & Concepts",          xp: 25 },
                { id: "py_requests_lib",          name: "requests Library",                 xp: 25 },
                { id: "py_api_auth",              name: "API Authentication (keys, tokens)", xp: 25 },
                { id: "py_parse_response",        name: "Parsing API Responses",            xp: 25 },
                { id: "py_api_errors",            name: "Handling API Errors",              xp: 25 },
                { id: "py_api_keys_env",          name: "Protecting API Keys with .env",    xp: 10 },
              ],
            },
          },

          "Level 2 - Advanced API Work": {
            sections: {
              "Advanced": [
                { id: "py_send_structured",       name: "Sending Structured JSON Data",     xp: 25 },
                { id: "py_rate_limiting_api",     name: "Rate Limiting & Retries",          xp: 25 },
                { id: "py_webhooks_py",           name: "Receiving Webhooks in Python",     xp: 40 },
                { id: "py_async_http",            name: "Async HTTP with httpx/aiohttp",    xp: 40 },
                { id: "py_flask_api",             name: "Building APIs with Flask",         xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 4: AI & MACHINE LEARNING
// ============================================================

const aiMachineLearningDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // AI Foundations
      // ─────────────────────────────────────────────
      "AI Foundations": {
        levels: {

          "Level 1 - Core Concepts": {
            sections: {
              "Understanding AI": [
                { id: "ai_what_is",               name: "What is AI / ML / DL",             xp: 10 },
                { id: "ai_types_learning",        name: "Types of Learning (Supervised, Unsupervised, RL)", xp: 25 },
                { id: "ai_neural_network_intuition", name: "Neural Network Intuition",      xp: 25 },
                { id: "ai_model_training",        name: "Model Training Basics",            xp: 25 },
                { id: "ai_datasets",              name: "Datasets & Labels",                xp: 10 },
                { id: "ai_training_vs_inference", name: "Training vs Inference",            xp: 10 },
              ],
            },
          },

          "Level 2 - Working with Models": {
            sections: {
              "Model Concepts": [
                { id: "ai_model_evaluation",      name: "Model Evaluation",                 xp: 25 },
                { id: "ai_overfitting",           name: "Overfitting & Underfitting",       xp: 25 },
                { id: "ai_tokens",                name: "Tokens & Context Windows",         xp: 25 },
                { id: "ai_embeddings",            name: "Embeddings Intuition",             xp: 40 },
                { id: "ai_attention",             name: "Attention & Transformers (Conceptual)", xp: 40 },
                { id: "ai_fine_tuning",           name: "Fine-tuning Concepts",             xp: 40 },
              ],
            },
          },

          "Level 3 - Prompt Engineering": {
            sections: {
              "Prompt Design": [
                { id: "prompt_design",            name: "Prompt Design Fundamentals",       xp: 25 },
                { id: "prompt_structured",        name: "Structured Prompts",               xp: 25 },
                { id: "prompt_few_shot",          name: "Few-shot Prompting",               xp: 25 },
                { id: "prompt_chain_of_thought",  name: "Chain-of-thought Prompting",       xp: 40 },
                { id: "prompt_system",            name: "System Prompts",                   xp: 25 },
                { id: "prompt_refinement",        name: "Prompt Refinement Workflows",      xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // LLM Engineering
      // ─────────────────────────────────────────────
      "LLM Engineering": {
        levels: {

          "Level 1 - Using LLMs": {
            sections: {
              "API Integration": [
                { id: "llm_api_calls",            name: "Calling LLM APIs (OpenAI, Anthropic)", xp: 25 },
                { id: "llm_handle_response",      name: "Handling LLM Responses",           xp: 25 },
                { id: "llm_structured_output",    name: "Parsing Structured JSON Output",   xp: 25 },
                { id: "llm_token_management",     name: "Managing Token Usage",             xp: 25 },
                { id: "llm_streaming",            name: "Streaming Responses",              xp: 25 },
                { id: "llm_cost_monitoring",      name: "Monitoring API Costs & Limits",    xp: 25 },
              ],
            },
          },

          "Level 2 - Advanced LLM Patterns": {
            sections: {
              "Advanced Patterns": [
                { id: "llm_model_chaining",       name: "Model Chaining",                   xp: 40 },
                { id: "llm_context_injection",    name: "Context Injection",                xp: 40 },
                { id: "llm_guardrails",           name: "AI Response Guardrails",           xp: 40 },
                { id: "llm_explainable",          name: "Explainable AI Outputs",           xp: 40 },
                { id: "llm_multi_model",          name: "Multi-model Workflows",            xp: 40 },
                { id: "llm_postprocessing",       name: "Post-processing AI Responses",     xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // AI Agents & Pipelines
      // ─────────────────────────────────────────────
      "AI Agents & Pipelines": {
        levels: {

          "Level 1 - Agent Basics": {
            sections: {
              "Agents": [
                { id: "agent_what_is",            name: "What are AI Agents",               xp: 25 },
                { id: "agent_tool_using",         name: "Tool-using Agents",                xp: 40 },
                { id: "agent_reasoning",          name: "Agent Reasoning Systems",          xp: 40 },
                { id: "agent_task_planning",      name: "Task Planning with AI",            xp: 40 },
                { id: "agent_interactive",        name: "Interactive AI Systems",           xp: 40 },
              ],
            },
          },

          "Level 2 - Orchestration": {
            sections: {
              "Multi-agent & Pipelines": [
                { id: "agent_multi",              name: "Multi-agent Systems",              xp: 40 },
                { id: "agent_orchestration",      name: "AI Orchestration",                 xp: 40 },
                { id: "n8n_basics",               name: "n8n Workflow Basics",              xp: 25 },
                { id: "n8n_triggers",             name: "Automation Triggers in n8n",       xp: 25 },
                { id: "n8n_api_connect",          name: "Connecting APIs in n8n",           xp: 25 },
                { id: "n8n_ai_pipeline",          name: "Building AI Pipelines in n8n",     xp: 40 },
              ],
            },
          },

          "Level 3 - Advanced Pipelines": {
            sections: {
              "Advanced": [
                { id: "agent_frameworks",         name: "Agent Frameworks (LangChain etc)", xp: 40 },
                { id: "agent_workflow_arch",      name: "AI Workflow Architecture",         xp: 40 },
                { id: "agent_data_flow",          name: "Data Flow Design in Pipelines",    xp: 40 },
                { id: "agent_cost_optimize",      name: "Cost Optimization for AI Workflows", xp: 40 },
                { id: "agent_local_cloud",        name: "Choosing Local vs Cloud Models",   xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Voice AI Systems
      // ─────────────────────────────────────────────
      "Voice AI Systems": {
        levels: {

          "Level 1 - Voice Basics": {
            sections: {
              "Speech Processing": [
                { id: "voice_stt",                name: "Speech-to-Text Systems",           xp: 40 },
                { id: "voice_tts",                name: "Text-to-Speech Systems",           xp: 40 },
                { id: "voice_microphone",         name: "Microphone Input Handling",        xp: 25 },
                { id: "voice_audio_formats",      name: "Audio Formats & Processing",       xp: 25 },
              ],
            },
          },

          "Level 2 - Voice Systems": {
            sections: {
              "Full Systems": [
                { id: "voice_wake_word",          name: "Wake-word Detection",              xp: 40 },
                { id: "voice_commands",           name: "Voice Command Systems",            xp: 40 },
                { id: "voice_assistant",          name: "Voice-controlled Assistants",      xp: 40 },
                { id: "jarvis_architecture",      name: "Jarvis-style Architecture",        xp: 40 },
                { id: "voice_command_parsing",    name: "Command Parsing & Function Dispatch", xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Local AI Models
      // ─────────────────────────────────────────────
      "Local AI Models": {
        levels: {

          "Level 1 - Running Local LLMs": {
            sections: {
              "Local AI": [
                { id: "ollama",                   name: "Ollama Setup & Usage",             xp: 40 },
                { id: "local_llm_models",         name: "Open-source LLMs (Llama, Mistral)", xp: 40 },
                { id: "hybrid_ai",                name: "Hybrid AI Systems (Local + API)",  xp: 40 },
                { id: "local_vs_cloud",           name: "Local vs Cloud Model Trade-offs",  xp: 25 },
                { id: "local_llm_inference",      name: "Inference Optimization for Local Models", xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 5: DATA SCIENCE & ANALYTICS
// ============================================================

const dataScienceDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // NumPy & Pandas
      // ─────────────────────────────────────────────
      "NumPy & Pandas": {
        levels: {

          "Level 1 - NumPy": {
            sections: {
              "NumPy Basics": [
                { id: "numpy_intro",              name: "NumPy Setup & Arrays",             xp: 25 },
                { id: "numpy_indexing",           name: "Indexing & Slicing",               xp: 25 },
                { id: "numpy_operations",         name: "Array Operations & Math",          xp: 25 },
                { id: "numpy_broadcasting",       name: "Broadcasting",                     xp: 40 },
                { id: "numpy_reshape",            name: "Reshape & Stacking",               xp: 25 },
                { id: "numpy_random",             name: "Random Module in NumPy",           xp: 10 },
              ],
            },
          },

          "Level 2 - Pandas Basics": {
            sections: {
              "Pandas Core": [
                { id: "pandas_intro",             name: "Pandas DataFrames & Series",       xp: 25 },
                { id: "pandas_read",              name: "Reading CSV, JSON, Excel",         xp: 25 },
                { id: "pandas_basic_ops",         name: "Basic DataFrame Operations",       xp: 25 },
                { id: "pandas_selection",         name: "Selecting Rows & Columns",         xp: 25 },
                { id: "pandas_sort",              name: "Sorting & Ranking",                xp: 10 },
                { id: "pandas_info",              name: "Info, Describe & Value Counts",    xp: 10 },
              ],
            },
          },

          "Level 3 - Data Wrangling": {
            sections: {
              "Data Cleaning": [
                { id: "pandas_missing",           name: "Handling Missing Data",            xp: 40 },
                { id: "pandas_filter",            name: "Filtering & Querying",             xp: 25 },
                { id: "pandas_groupby",           name: "GroupBy & Aggregation",            xp: 40 },
                { id: "pandas_merge",             name: "Merging & Joining DataFrames",     xp: 40 },
                { id: "pandas_transform",         name: "Apply, Map & Transform",           xp: 40 },
                { id: "pandas_pivot",             name: "Pivot Tables",                     xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // SQL
      // ─────────────────────────────────────────────
      "SQL": {
        levels: {

          "Level 1 - SQL Basics": {
            sections: {
              "Core SQL": [
                { id: "sql_basics",               name: "SQL Basics & Syntax",              xp: 25 },
                { id: "sql_select",               name: "SELECT & WHERE Queries",           xp: 25 },
                { id: "sql_crud",                 name: "INSERT, UPDATE, DELETE",           xp: 25 },
                { id: "sql_joins",                name: "JOINs",                            xp: 40 },
                { id: "sql_aggregate",            name: "Aggregate Functions (COUNT, SUM)", xp: 25 },
                { id: "sql_groupby",              name: "GROUP BY & HAVING",                xp: 25 },
              ],
            },
          },

          "Level 2 - Advanced SQL": {
            sections: {
              "Advanced Queries": [
                { id: "sql_subqueries",           name: "Subqueries & CTEs",               xp: 40 },
                { id: "sql_window",               name: "Window Functions",                 xp: 40 },
                { id: "sql_indexes",              name: "Indexes & Performance",            xp: 40 },
                { id: "sql_views",                name: "Views & Stored Procedures",        xp: 40 },
                { id: "sql_transactions",         name: "Transactions & ACID",              xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Data Visualization
      // ─────────────────────────────────────────────
      "Data Visualization": {
        levels: {

          "Level 1 - Matplotlib": {
            sections: {
              "Basic Plots": [
                { id: "matplotlib_basics",        name: "Matplotlib Basics",                xp: 25 },
                { id: "matplotlib_plots",         name: "Line, Bar & Scatter Plots",        xp: 25 },
                { id: "matplotlib_customize",     name: "Customization & Styling",          xp: 25 },
                { id: "matplotlib_subplots",      name: "Subplots & Figures",               xp: 25 },
                { id: "matplotlib_save",          name: "Saving & Exporting Charts",        xp: 10 },
              ],
            },
          },

          "Level 2 - Seaborn & Plotly": {
            sections: {
              "Advanced Visualization": [
                { id: "seaborn_basics",           name: "Seaborn Statistical Plots",        xp: 25 },
                { id: "seaborn_heatmap",          name: "Heatmaps & Correlation Plots",     xp: 25 },
                { id: "plotly_basics",            name: "Plotly Interactive Charts",        xp: 40 },
                { id: "plotly_dash",              name: "Plotly Dash Dashboards",           xp: 40 },
                { id: "plotly_maps",              name: "Geographic Visualizations",        xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Statistics & Math for DS
      // ─────────────────────────────────────────────
      "Statistics & Math for DS": {
        levels: {

          "Level 1 - Core Statistics": {
            sections: {
              "Descriptive Stats": [
                { id: "stats_central",            name: "Mean, Median, Mode",               xp: 10 },
                { id: "stats_spread",             name: "Variance & Standard Deviation",    xp: 10 },
                { id: "stats_distributions",      name: "Probability Distributions",        xp: 25 },
                { id: "stats_probability",        name: "Probability Basics",               xp: 25 },
                { id: "stats_correlation",        name: "Correlation & Covariance",         xp: 25 },
                { id: "stats_bayes",              name: "Bayes Theorem Basics",             xp: 40 },
              ],
            },
          },

          "Level 2 - Applied Stats": {
            sections: {
              "Inferential Statistics": [
                { id: "stats_hypothesis",         name: "Hypothesis Testing",               xp: 40 },
                { id: "stats_confidence",         name: "Confidence Intervals",             xp: 40 },
                { id: "stats_significance",       name: "Statistical Significance & p-value", xp: 40 },
                { id: "stats_regression",         name: "Linear Regression Basics",         xp: 40 },
                { id: "stats_anova",              name: "ANOVA",                            xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Machine Learning with Sklearn
      // ─────────────────────────────────────────────
      "Machine Learning with Sklearn": {
        levels: {

          "Level 1 - ML Basics": {
            sections: {
              "Supervised Learning": [
                { id: "ml_workflow",              name: "ML Workflow Overview",             xp: 25 },
                { id: "ml_train_test",            name: "Train/Test Split",                 xp: 25 },
                { id: "ml_linear_regression",     name: "Linear Regression",                xp: 25 },
                { id: "ml_logistic_regression",   name: "Logistic Regression",              xp: 25 },
                { id: "ml_feature_engineering",   name: "Feature Engineering & Scaling",    xp: 40 },
              ],
            },
          },

          "Level 2 - Intermediate ML": {
            sections: {
              "Tree-based Models": [
                { id: "ml_decision_tree",         name: "Decision Trees",                   xp: 40 },
                { id: "ml_random_forest",         name: "Random Forests",                   xp: 40 },
                { id: "ml_svm",                   name: "Support Vector Machines",          xp: 40 },
                { id: "ml_evaluation",            name: "Model Evaluation Metrics",         xp: 40 },
                { id: "ml_cross_val",             name: "Cross Validation",                 xp: 40 },
                { id: "ml_hyperparameter",        name: "Hyperparameter Tuning",            xp: 40 },
              ],
            },
          },

          "Level 3 - Advanced ML": {
            sections: {
              "Advanced Topics": [
                { id: "ml_clustering",            name: "Clustering (K-Means, DBSCAN)",     xp: 40 },
                { id: "ml_dimensionality",        name: "Dimensionality Reduction (PCA)",   xp: 40 },
                { id: "ml_pipelines",             name: "Sklearn Pipelines",                xp: 40 },
                { id: "ml_imbalanced",            name: "Imbalanced Data Handling",         xp: 40 },
                { id: "ml_model_deployment",      name: "Saving & Deploying ML Models",     xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 6: CYBERSECURITY
// ============================================================

const cybersecurityDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // Networking Fundamentals
      // ─────────────────────────────────────────────
      "Networking Fundamentals": {
        levels: {

          "Level 1 - Core Networking": {
            sections: {
              "Network Basics": [
                { id: "net_osi_model",            name: "OSI Model",                        xp: 40 },
                { id: "net_tcp_ip",               name: "TCP/IP Stack",                     xp: 40 },
                { id: "net_dns",                  name: "DNS",                              xp: 25 },
                { id: "net_http_https",           name: "HTTP & HTTPS",                     xp: 25 },
                { id: "net_ip_subnetting",        name: "IP Addressing & Subnetting",       xp: 40 },
                { id: "net_ports_protocols",      name: "Ports & Protocols",                xp: 25 },
              ],
            },
          },

          "Level 2 - Network Tools": {
            sections: {
              "Tools": [
                { id: "net_wireshark",            name: "Wireshark Basics",                 xp: 40 },
                { id: "net_nmap",                 name: "Nmap Basics",                      xp: 40 },
                { id: "net_packet_analysis",      name: "Packet Analysis",                  xp: 40 },
                { id: "net_port_scanning",        name: "Port Scanning Techniques",         xp: 40 },
                { id: "net_firewall",             name: "Firewalls & Network Security",     xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Linux for Security
      // ─────────────────────────────────────────────
      "Linux for Security": {
        levels: {

          "Level 1 - Linux Basics": {
            sections: {
              "Linux Core": [
                { id: "linux_filesystem",         name: "Linux File System Navigation",     xp: 25 },
                { id: "linux_permissions",        name: "File Permissions (chmod, chown)",  xp: 25 },
                { id: "linux_users",              name: "Users & Groups",                   xp: 25 },
                { id: "linux_basic_commands",     name: "Basic Commands (ls, grep, find)",  xp: 25 },
                { id: "linux_package_manager",    name: "Package Managers (apt, yum)",      xp: 10 },
                { id: "linux_text_editors",       name: "Text Editors (vim, nano)",         xp: 10 },
              ],
            },
          },

          "Level 2 - Linux for Hacking": {
            sections: {
              "Advanced Linux": [
                { id: "linux_bash_scripting",     name: "Bash Scripting",                   xp: 40 },
                { id: "linux_process",            name: "Process Management",               xp: 25 },
                { id: "linux_ssh",                name: "SSH & Remote Access",              xp: 40 },
                { id: "linux_env_vars",           name: "Environment Variables & PATH",     xp: 25 },
                { id: "linux_logs",               name: "Log Files & Monitoring",           xp: 40 },
                { id: "linux_cron",               name: "Cron Jobs & Scheduling",           xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Web Security
      // ─────────────────────────────────────────────
      "Web Security (Cyber)": {
        levels: {

          "Level 1 - OWASP Fundamentals": {
            sections: {
              "Common Attacks": [
                { id: "cyber_sqli",               name: "SQL Injection",                    xp: 40 },
                { id: "cyber_xss",                name: "Cross-Site Scripting (XSS)",       xp: 40 },
                { id: "cyber_csrf",               name: "CSRF",                             xp: 40 },
                { id: "cyber_idor",               name: "Insecure Direct Object Reference", xp: 40 },
                { id: "cyber_misconfig",          name: "Security Misconfiguration",        xp: 40 },
                { id: "owasp_top10",              name: "OWASP Top 10 Overview",            xp: 40 },
              ],
            },
          },

          "Level 2 - Web Attack & Defense": {
            sections: {
              "Attack & Defense": [
                { id: "burp_suite",               name: "Burp Suite Basics",                xp: 40 },
                { id: "cyber_auth_flaws",         name: "Authentication Flaws",             xp: 40 },
                { id: "cyber_session_hijack",     name: "Session Hijacking",                xp: 40 },
                { id: "cyber_clickjacking",       name: "Clickjacking & UI Redressing",     xp: 25 },
                { id: "cyber_xxe",                name: "XXE & SSRF",                       xp: 40 },
              ],
            },
          },

          "Level 3 - Secure Development": {
            sections: {
              "Secure Coding": [
                { id: "cyber_secure_coding",      name: "Secure Coding Practices",          xp: 40 },
                { id: "cyber_api_security",       name: "API Security",                     xp: 40 },
                { id: "cyber_https_certs",        name: "HTTPS & Certificates",             xp: 25 },
                { id: "cyber_csp",                name: "Content Security Policy (CSP)",    xp: 40 },
                { id: "cyber_dep_scanning",       name: "Dependency Scanning",              xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Ethical Hacking & Penetration Testing
      // ─────────────────────────────────────────────
      "Ethical Hacking & Pentesting": {
        levels: {

          "Level 1 - Recon & Enumeration": {
            sections: {
              "Reconnaissance": [
                { id: "pentest_osint",            name: "OSINT Basics",                     xp: 40 },
                { id: "pentest_footprint",        name: "Footprinting & Reconnaissance",    xp: 40 },
                { id: "pentest_enum",             name: "Enumeration Techniques",           xp: 40 },
                { id: "pentest_recon_tools",      name: "Recon Tools (theHarvester, shodan)", xp: 40 },
                { id: "pentest_methodology",      name: "Pentesting Methodology",           xp: 40 },
              ],
            },
          },

          "Level 2 - Exploitation Basics": {
            sections: {
              "Exploitation": [
                { id: "vuln_scanning",            name: "Vulnerability Scanning (Nikto, Nessus)", xp: 40 },
                { id: "metasploit",               name: "Metasploit Basics",                xp: 40 },
                { id: "exploitation_concepts",    name: "Exploitation Concepts",            xp: 40 },
                { id: "ctf_basics",               name: "CTF Fundamentals",                 xp: 40 },
                { id: "ctf_web",                  name: "CTF Web Challenges",               xp: 40 },
              ],
            },
          },

          "Level 3 - Advanced Pentesting": {
            sections: {
              "Advanced": [
                { id: "post_exploitation",        name: "Post-exploitation Techniques",     xp: 40 },
                { id: "priv_escalation",          name: "Privilege Escalation",             xp: 40 },
                { id: "pentest_reporting",        name: "Writing Pentest Reports",          xp: 40 },
                { id: "bug_bounty",               name: "Bug Bounty Methodology",           xp: 40 },
                { id: "pentest_social_eng",       name: "Social Engineering Basics",        xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Cryptography
      // ─────────────────────────────────────────────
      "Cryptography": {
        levels: {

          "Level 1 - Crypto Basics": {
            sections: {
              "Core Crypto": [
                { id: "crypto_symmetric",         name: "Symmetric Encryption (AES)",       xp: 40 },
                { id: "crypto_asymmetric",        name: "Asymmetric Encryption (RSA)",      xp: 40 },
                { id: "crypto_hashing",           name: "Hashing Algorithms (SHA, MD5)",    xp: 40 },
                { id: "crypto_keys",              name: "Public/Private Keys",              xp: 40 },
                { id: "crypto_encoding",          name: "Encoding (Base64, Hex)",           xp: 25 },
              ],
            },
          },

          "Level 2 - Applied Cryptography": {
            sections: {
              "Applied": [
                { id: "crypto_tls",               name: "TLS / SSL",                        xp: 40 },
                { id: "crypto_signatures",        name: "Digital Signatures",               xp: 40 },
                { id: "crypto_password",          name: "Password Hashing (bcrypt, Argon2)", xp: 40 },
                { id: "crypto_pki",               name: "PKI Basics",                       xp: 40 },
                { id: "crypto_attack_types",      name: "Common Crypto Attacks",            xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Defensive Security & Forensics
      // ─────────────────────────────────────────────
      "Defensive Security & Forensics": {
        levels: {

          "Level 1 - Blue Team Basics": {
            sections: {
              "Defense": [
                { id: "blue_log_analysis",        name: "Log Analysis",                     xp: 40 },
                { id: "blue_ids_ips",             name: "IDS & IPS",                        xp: 40 },
                { id: "blue_siem",                name: "SIEM Basics",                      xp: 40 },
                { id: "blue_monitoring",          name: "Security Monitoring",              xp: 40 },
                { id: "blue_threat_intel",        name: "Threat Intelligence Basics",       xp: 40 },
              ],
            },
          },

          "Level 2 - Forensics": {
            sections: {
              "Digital Forensics": [
                { id: "forensics_disk",           name: "Disk Forensics",                   xp: 40 },
                { id: "forensics_memory",         name: "Memory Forensics",                 xp: 40 },
                { id: "forensics_ir",             name: "Incident Response",                xp: 40 },
                { id: "forensics_evidence",       name: "Evidence Handling",                xp: 40 },
                { id: "forensics_malware",        name: "Malware Analysis Basics",          xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 7: DEVOPS & INFRASTRUCTURE
// ============================================================

const devopsDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // Git & Version Control
      // ─────────────────────────────────────────────
      "Git & Version Control": {
        levels: {

          "Level 1 - Git Basics": {
            sections: {
              "Core Git": [
                { id: "git_intro",                name: "What is Git & Version Control",    xp: 10, course: "sigma" },
                { id: "git_init",                 name: "git init & Repositories",          xp: 10, course: "sigma" },
                { id: "git_add_commit",           name: "git add & commit",                 xp: 10, course: "sigma" },
                { id: "git_push_pull",            name: "git push & pull",                  xp: 10, course: "sigma" },
                { id: "git_status_log",           name: "git status & log",                 xp: 10, course: "sigma" },
                { id: "git_clone",                name: "git clone",                        xp: 10, course: "sigma" },
              ],
            },
          },

          "Level 2 - Collaboration": {
            sections: {
              "Team Git": [
                { id: "git_branches",             name: "Branches",                         xp: 25, course: "sigma" },
                { id: "git_merge",                name: "Merging",                          xp: 25, course: "sigma" },
                { id: "git_pull_requests",        name: "Pull Requests",                    xp: 25, course: "sigma" },
                { id: "git_conflicts",            name: "Merge Conflicts",                  xp: 40, course: "sigma" },
                { id: "git_issue_tracking",       name: "Issue Tracking",                   xp: 10, course: "sigma" },
                { id: "github_profile",           name: "GitHub Profile & README",          xp: 10 },
              ],
            },
          },

          "Level 3 - Advanced Git": {
            sections: {
              "Power User Git": [
                { id: "git_rebase",               name: "Rebasing",                         xp: 40 },
                { id: "git_cherry_pick",          name: "Cherry-pick",                      xp: 40 },
                { id: "git_stash",                name: "git stash",                        xp: 25 },
                { id: "git_tags",                 name: "Tagging Releases",                 xp: 25 },
                { id: "git_hooks",                name: "Git Hooks",                        xp: 40 },
                { id: "github_actions_basics",    name: "GitHub Actions Basics",            xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Terminal & Shell
      // ─────────────────────────────────────────────
      "Terminal & Shell": {
        levels: {

          "Level 1 - Terminal Basics": {
            sections: {
              "Command Line": [
                { id: "terminal_navigation",      name: "File System Navigation",           xp: 10, course: "sigma" },
                { id: "terminal_file_ops",        name: "File Operations (cp, mv, rm)",     xp: 10, course: "sigma" },
                { id: "terminal_permissions",     name: "Permissions & sudo",               xp: 25 },
                { id: "terminal_env_vars",        name: "Environment Variables",            xp: 25, course: "sigma" },
                { id: "terminal_piping",          name: "Piping & Redirection",             xp: 25 },
                { id: "terminal_grep_find",       name: "grep & find Commands",             xp: 25 },
              ],
            },
          },

          "Level 2 - Shell Scripting": {
            sections: {
              "Scripting": [
                { id: "bash_basics",              name: "Bash Script Basics",               xp: 40 },
                { id: "bash_variables",           name: "Variables & Control Flow in Bash", xp: 40 },
                { id: "bash_loops",               name: "Loops in Bash",                    xp: 40 },
                { id: "bash_functions",           name: "Functions in Bash",                xp: 40 },
                { id: "cron_jobs",                name: "Cron Jobs",                        xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Development Environments
      // ─────────────────────────────────────────────
      "Development Environments": {
        levels: {

          "Level 1 - Setup & Config": {
            sections: {
              "Environment Setup": [
                { id: "dev_env_setup",            name: "Installing Dev Tools (VSCode, Node, Python)", xp: 10, course: "sigma" },
                { id: "dev_env_dotenv",           name: ".env Files & dotenv",              xp: 10, course: "sigma" },
                { id: "dev_env_npm",              name: "Package Managers (npm, pip, yarn)", xp: 10, course: "sigma" },
                { id: "dev_env_venv",             name: "Python Virtual Environments",      xp: 10 },
                { id: "dev_env_project_structure", name: "Project Folder Structure Best Practices", xp: 10 },
                { id: "dev_env_editor_config",    name: "Editor Config & Extensions",       xp: 10 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Docker & Containers
      // ─────────────────────────────────────────────
      "Docker & Containers": {
        levels: {

          "Level 1 - Docker Basics": {
            sections: {
              "Containers": [
                { id: "docker_intro",             name: "What is Docker & Containers",      xp: 25 },
                { id: "docker_images",            name: "Images & Containers",              xp: 25 },
                { id: "docker_dockerfile",        name: "Writing a Dockerfile",             xp: 40 },
                { id: "docker_commands",          name: "Docker CLI Commands",              xp: 25 },
                { id: "docker_volumes",           name: "Volumes & Bind Mounts",            xp: 25 },
              ],
            },
          },

          "Level 2 - Docker Compose": {
            sections: {
              "Multi-container": [
                { id: "docker_compose",           name: "Docker Compose Basics",            xp: 40 },
                { id: "docker_compose_network",   name: "Networking in Docker",             xp: 40 },
                { id: "docker_compose_env",       name: "Environment in Docker Compose",    xp: 25 },
                { id: "docker_registry",          name: "Docker Hub & Private Registries",  xp: 25 },
                { id: "docker_optimization",      name: "Image Optimization",               xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // CI/CD & Deployment
      // ─────────────────────────────────────────────
      "CI/CD & Deployment": {
        levels: {

          "Level 1 - Hosting Platforms": {
            sections: {
              "Deploy": [
                { id: "deploy_vercel",            name: "Vercel Deployment",                xp: 25, course: "sigma" },
                { id: "deploy_netlify",           name: "Netlify Deployment",               xp: 25 },
                { id: "deploy_render",            name: "Render Deployment",                xp: 25 },
                { id: "deploy_railway",           name: "Railway",                          xp: 25 },
                { id: "deploy_running_servers",   name: "Running & Managing Servers",       xp: 25 },
                { id: "deploy_domain_dns",        name: "Custom Domains & DNS",             xp: 25 },
              ],
            },
          },

          "Level 2 - CI/CD Pipelines": {
            sections: {
              "Automation": [
                { id: "cicd_concepts",            name: "CI/CD Concepts",                   xp: 40 },
                { id: "cicd_github_actions",      name: "GitHub Actions",                   xp: 40 },
                { id: "cicd_automated_testing",   name: "Automated Testing in CI",          xp: 40 },
                { id: "cicd_deploy_strategies",   name: "Deployment Strategies",            xp: 40 },
                { id: "cicd_monitoring",          name: "Monitoring & Alerting",            xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Cloud Basics
      // ─────────────────────────────────────────────
      "Cloud Basics": {
        levels: {

          "Level 1 - Cloud Concepts": {
            sections: {
              "Cloud Intro": [
                { id: "cloud_what_is",            name: "What is Cloud Computing",          xp: 25 },
                { id: "cloud_aws_basics",         name: "AWS Overview",                     xp: 25 },
                { id: "cloud_s3",                 name: "S3 Buckets & Storage",             xp: 25 },
                { id: "cloud_ec2",                name: "EC2 Instances",                    xp: 40 },
                { id: "cloud_iam",                name: "IAM & Permissions",                xp: 40 },
                { id: "cloud_vs_local",           name: "Cloud vs Local Trade-offs",        xp: 10 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 8: SYSTEM DESIGN & ARCHITECTURE
// ============================================================

const systemDesignDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // System Design Fundamentals
      // ─────────────────────────────────────────────
      "System Design Fundamentals": {
        levels: {

          "Level 1 - Core Concepts": {
            sections: {
              "Foundations": [
                { id: "sd_client_server",         name: "Client-Server Model",              xp: 25 },
                { id: "sd_api_contracts",         name: "APIs as Contracts",                xp: 25 },
                { id: "sd_db_selection",          name: "Database Selection",               xp: 40 },
                { id: "sd_monolith_micro",        name: "Monolith vs Microservices",        xp: 40 },
                { id: "sd_components",            name: "Breaking Systems into Components", xp: 40 },
                { id: "sd_data_flow",             name: "Data Flow Design",                 xp: 40 },
              ],
            },
          },

          "Level 2 - Design Patterns": {
            sections: {
              "Patterns": [
                { id: "sd_mvc_pattern",           name: "MVC Pattern",                      xp: 25 },
                { id: "sd_event_driven",          name: "Event-driven Architecture",        xp: 40 },
                { id: "sd_pipeline_arch",         name: "Pipeline Architecture",            xp: 40 },
                { id: "sd_component_design",      name: "Component Design Principles",      xp: 40 },
                { id: "sd_workflow_diagrams",     name: "Workflow Diagrams",                xp: 25 },
              ],
            },
          },

          "Level 3 - Designing Real Systems": {
            sections: {
              "Case Studies": [
                { id: "sd_design_auth",           name: "Designing an Auth System",         xp: 40 },
                { id: "sd_design_feed",           name: "Designing a Social Feed",          xp: 40 },
                { id: "sd_design_url",            name: "URL Shortener Design",             xp: 40 },
                { id: "sd_design_rate_limiter",   name: "Rate Limiter Design",              xp: 40 },
                { id: "sd_design_chat",           name: "Chat System Design",               xp: 40 },
                { id: "sd_design_file_storage",   name: "File Storage System Design",       xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Software Architecture Patterns
      // ─────────────────────────────────────────────
      "Software Architecture Patterns": {
        levels: {

          "Level 1 - Core Patterns": {
            sections: {
              "Architecture": [
                { id: "arch_rest",                name: "REST Architecture",                xp: 25 },
                { id: "arch_mvc",                 name: "MVC Architecture",                 xp: 25 },
                { id: "arch_layered",             name: "Layered Architecture",             xp: 40 },
                { id: "arch_repository_pattern",  name: "Repository Pattern",               xp: 40 },
                { id: "arch_clean_arch",          name: "Clean Architecture Basics",        xp: 40 },
              ],
            },
          },

          "Level 2 - Advanced Patterns": {
            sections: {
              "Advanced": [
                { id: "arch_microservices",       name: "Microservices Architecture",       xp: 40 },
                { id: "arch_queue_systems",       name: "Queue-based Systems",              xp: 40 },
                { id: "arch_serverless",          name: "Serverless Architecture",          xp: 40 },
                { id: "arch_event_sourcing",      name: "Event Sourcing & CQRS",            xp: 40 },
                { id: "arch_api_gateway",         name: "API Gateway Pattern",              xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Scalability & Performance
      // ─────────────────────────────────────────────
      "Scalability & Performance": {
        levels: {

          "Level 1 - Basics": {
            sections: {
              "Scaling Concepts": [
                { id: "scale_caching",            name: "Caching Concepts (Redis, Memcached)", xp: 40 },
                { id: "scale_load_balancing",     name: "Load Balancing",                   xp: 40 },
                { id: "scale_db_indexing",        name: "Database Indexing for Scale",      xp: 40 },
                { id: "scale_cdn",                name: "CDN Concepts",                     xp: 25 },
                { id: "scale_horizontal_vertical", name: "Horizontal vs Vertical Scaling",  xp: 40 },
              ],
            },
          },

          "Level 2 - Advanced Scaling": {
            sections: {
              "Distributed Systems": [
                { id: "scale_distributed",        name: "Distributed Systems Concepts",     xp: 40 },
                { id: "scale_cap",                name: "CAP Theorem",                      xp: 40 },
                { id: "scale_sharding",           name: "Database Sharding",                xp: 40 },
                { id: "scale_message_queues",     name: "Message Queues (RabbitMQ, Kafka)", xp: 40 },
                { id: "scale_replication",        name: "Database Replication",             xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 9: VISUALIZATION & GRAPHICS
// ============================================================

const visualizationGraphicsDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // SVG & Canvas
      // ─────────────────────────────────────────────
      "SVG & Canvas": {
        levels: {

          "Level 1 - SVG Basics": {
            sections: {
              "SVG Core": [
                { id: "svg_syntax",               name: "SVG Syntax & Structure",           xp: 25 },
                { id: "svg_shapes",               name: "Basic Shapes (rect, circle, path)", xp: 25 },
                { id: "svg_paths",                name: "SVG Paths",                        xp: 40 },
                { id: "svg_styling",              name: "Styling SVG",                      xp: 25 },
                { id: "svg_viewbox",              name: "Viewbox & Coordinates",            xp: 25 },
                { id: "svg_text",                 name: "Text in SVG",                      xp: 10 },
              ],
            },
          },

          "Level 2 - Interactive SVG": {
            sections: {
              "Animation & Interactivity": [
                { id: "svg_animations",           name: "SVG Animations",                   xp: 40 },
                { id: "svg_js",                   name: "SVG with JavaScript",              xp: 40 },
                { id: "d3_basics",                name: "D3.js Basics",                     xp: 40 },
                { id: "d3_data_driven",           name: "Data-driven SVG with D3",          xp: 40 },
                { id: "canvas_basics",            name: "Canvas API Basics",                xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Interactive Maps
      // ─────────────────────────────────────────────
      "Interactive Maps": {
        levels: {

          "Level 1 - Map Fundamentals": {
            sections: {
              "Map Basics": [
                { id: "map_libraries",            name: "Map Libraries (Leaflet, Mapbox)",  xp: 40 },
                { id: "map_markers",              name: "Markers & Popups",                 xp: 25 },
                { id: "map_display",              name: "Displaying Locations on Maps",     xp: 25 },
                { id: "map_tiles",                name: "Tile Layers & Map Styles",         xp: 25 },
                { id: "map_events",               name: "Map Events & Interactivity",       xp: 25 },
              ],
            },
          },

          "Level 2 - Advanced Maps": {
            sections: {
              "Advanced": [
                { id: "map_geojson",              name: "GeoJSON",                          xp: 40 },
                { id: "map_path_viz",             name: "Path Visualization",               xp: 40 },
                { id: "map_custom_layers",        name: "Custom Layers",                    xp: 40 },
                { id: "map_shortest_path",        name: "Shortest Path on Maps",            xp: 40 },
                { id: "map_ui_design",            name: "Map UI Design",                    xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Three.js & 3D
      // ─────────────────────────────────────────────
      "Three.js & 3D": {
        levels: {

          "Level 1 - Three.js Basics": {
            sections: {
              "Scene Setup": [
                { id: "threejs_scene",            name: "Scene, Camera & Renderer",         xp: 40 },
                { id: "threejs_geometries",       name: "Geometries",                       xp: 40 },
                { id: "threejs_materials",        name: "Materials & Textures",             xp: 40 },
                { id: "threejs_lighting",         name: "Lighting",                         xp: 40 },
                { id: "threejs_orbit",            name: "OrbitControls & Camera Movement",  xp: 25 },
              ],
            },
          },

          "Level 2 - Advanced 3D": {
            sections: {
              "Advanced": [
                { id: "threejs_animations",       name: "Animations & Animation Loop",      xp: 40 },
                { id: "threejs_loaders",          name: "3D Model Loaders (GLTF, OBJ)",     xp: 40 },
                { id: "threejs_shaders",          name: "Shaders Intro (GLSL basics)",      xp: 40 },
                { id: "threejs_interactive",      name: "Interactive 3D Navigation",        xp: 40 },
                { id: "threejs_postprocessing",   name: "Post-processing Effects",          xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Blender
      // ─────────────────────────────────────────────
      "Blender": {
        levels: {

          "Level 1 - Blender Basics": {
            sections: {
              "Fundamentals": [
                { id: "blender_interface",        name: "Blender Interface",                xp: 25 },
                { id: "blender_modeling",         name: "Basic 3D Modeling",                xp: 40 },
                { id: "blender_materials",        name: "Materials & Shaders",              xp: 40 },
                { id: "blender_rendering",        name: "Rendering",                        xp: 40 },
                { id: "blender_lighting",         name: "Lighting & HDRI",                  xp: 25 },
              ],
            },
          },

          "Level 2 - Intermediate Blender": {
            sections: {
              "Animation & Export": [
                { id: "blender_rigging",          name: "Rigging Basics",                   xp: 40 },
                { id: "blender_animation",        name: "Animation",                        xp: 40 },
                { id: "blender_export_web",       name: "Exporting for Web (GLTF)",         xp: 40 },
                { id: "blender_sculpting",        name: "Sculpting Basics",                 xp: 40 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// DOMAIN 10: PRODUCT, UX & COMMUNICATION
// ============================================================

const productUXDomain = {
    technologies: {

      // ─────────────────────────────────────────────
      // UI/UX Design
      // ─────────────────────────────────────────────
      "UI/UX Design": {
        levels: {

          "Level 1 - Design Fundamentals": {
            sections: {
              "Core Design": [
                { id: "ux_info_hierarchy",        name: "Information Hierarchy",            xp: 25 },
                { id: "ux_user_flow",             name: "User Flow Design",                 xp: 25 },
                { id: "ux_wireframing",           name: "Wireframing",                      xp: 25 },
                { id: "ux_cognitive_load",        name: "Cognitive Load Reduction",         xp: 25 },
                { id: "ux_minimal_design",        name: "Minimal Interface Design",         xp: 25 },
                { id: "ux_accessibility",         name: "Accessibility Basics",             xp: 25 },
              ],
            },
          },

          "Level 2 - Tools & Practice": {
            sections: {
              "Design Tools": [
                { id: "figma_basics",             name: "Figma Basics",                     xp: 40 },
                { id: "figma_components",         name: "Figma Components & Variants",      xp: 40 },
                { id: "figma_prototyping",        name: "Prototyping in Figma",             xp: 40 },
                { id: "ux_design_systems",        name: "Design Systems",                   xp: 40 },
                { id: "ux_color_typography",      name: "Color & Typography in Design",     xp: 25 },
                { id: "ux_interaction_design",    name: "Interaction Design",               xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Product Thinking
      // ─────────────────────────────────────────────
      "Product Thinking": {
        levels: {

          "Level 1 - Core Concepts": {
            sections: {
              "Product Basics": [
                { id: "product_mvp",              name: "MVP Scoping",                      xp: 25 },
                { id: "product_prioritization",   name: "Feature Prioritization",           xp: 25 },
                { id: "product_decompose",        name: "Problem Decomposition",            xp: 25 },
                { id: "product_feedback",         name: "User Feedback Loops",              xp: 25 },
                { id: "product_rapid_proto",      name: "Rapid Prototyping",                xp: 25 },
                { id: "product_pmf",              name: "Product-market Fit Thinking",      xp: 40 },
              ],
            },
          },

          "Level 2 - Advanced Product": {
            sections: {
              "Advanced": [
                { id: "product_ab_testing",       name: "A/B Testing Thinking",             xp: 40 },
                { id: "product_iteration",        name: "Iteration Cycles",                 xp: 25 },
                { id: "product_analytics",        name: "Basic Analytics Tools",            xp: 25 },
                { id: "product_roadmap",          name: "Product Roadmapping",              xp: 40 },
                { id: "product_metrics",          name: "Success Metrics & KPIs",           xp: 40 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Technical Communication
      // ─────────────────────────────────────────────
      "Technical Communication": {
        levels: {

          "Level 1 - Writing & Docs": {
            sections: {
              "Documentation": [
                { id: "doc_readme",               name: "Writing READMEs",                  xp: 25 },
                { id: "doc_technical",            name: "Technical Documentation",          xp: 25 },
                { id: "doc_feature_spec",         name: "Feature Specifications",           xp: 40 },
                { id: "doc_explain_tech",         name: "Explaining Technical Ideas",       xp: 25 },
                { id: "doc_architecture",         name: "Documenting Architecture",         xp: 40 },
                { id: "doc_api_docs",             name: "API Documentation Writing",        xp: 40 },
              ],
            },
          },

          "Level 2 - Presenting": {
            sections: {
              "Presentation Skills": [
                { id: "present_pitch",            name: "Pitching a Product",               xp: 40 },
                { id: "present_proposal",         name: "Writing Project Proposals",        xp: 40 },
                { id: "present_slides",           name: "Preparing Technical Presentations", xp: 25 },
                { id: "present_demo",             name: "Demo Preparation",                 xp: 25 },
                { id: "present_workflow",         name: "Explaining System Workflows",      xp: 25 },
              ],
            },
          },

        },
      },

      // ─────────────────────────────────────────────
      // Team & Hackathon Skills
      // ─────────────────────────────────────────────
      "Team & Hackathon Skills": {
        levels: {

          "Level 1 - Collaboration": {
            sections: {
              "Teamwork": [
                { id: "team_collaboration",       name: "Team Collaboration",               xp: 25 },
                { id: "team_dividing_roles",      name: "Dividing Roles in Teams",          xp: 25 },
                { id: "team_time_management",     name: "Time Management",                  xp: 25 },
                { id: "team_mvp_build",           name: "Building MVPs Fast",               xp: 40 },
                { id: "team_integration",         name: "Integrating Team Components",      xp: 40 },
              ],
            },
          },

          "Level 2 - Execution": {
            sections: {
              "Hackathon Strategy": [
                { id: "hack_strategy",            name: "Hackathon Strategy",               xp: 40 },
                { id: "hack_explain_arch",        name: "Explaining System Architecture",   xp: 40 },
                { id: "hack_scoping",             name: "Scoping under Time Pressure",      xp: 40 },
                { id: "hack_postmortem",          name: "Post-hackathon Writeup",           xp: 25 },
                { id: "hack_demo_day",            name: "Demo Day Preparation",             xp: 25 },
              ],
            },
          },

        },
      },

    },
};


// ============================================================
// EXPORT ALL DOMAINS
// ============================================================

export const skillsTree = {
  "Web Development": webDevelopmentDomain,
  "DSA & Computer Science": dsaComputerScienceDomain,
  "Python & Automation": pythonAutomationDomain,
  "AI & Machine Learning": aiMachineLearningDomain,
  "Data Science": dataScienceDomain,
  "Cybersecurity": cybersecurityDomain,
  "DevOps & Infrastructure": devopsDomain,
  "System Design": systemDesignDomain,
  "Visualization & Graphics": visualizationGraphicsDomain,
  "Product & UX": productUXDomain,
};