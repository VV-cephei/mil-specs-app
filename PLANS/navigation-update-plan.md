# Navigation and Routing Update Plan

## Objective
Integrate the new tools (MIL-STD-202 Viewer and Spec Superseding Lookup) into the application's navigation structure, ensuring they are accessible from the Homepage and the Tools Index page, and that their routes are correctly registered.

## Analysis
*   **Current State**:
    *   `src/plugins/tools-expansion/index.js` defines the routes.
    *   `src/router/index.js` attempts to register routes by modifying the `children` array of existing routes, which is not the correct way to dynamically add routes in Vue Router 4.
    *   `src/views/tools/index.vue` attempts to display tool descriptions but accesses `tool.description` instead of `tool.meta.description`.
    *   `src/views/HomeView.vue` has hardcoded links and does not reference the new tools.

## Implementation Steps

### 1. Refactor Route Registration (`src/router/index.js`)
*   **Goal**: Ensure dynamic routes are correctly added to the router instance.
*   **Action**: Update `registerPluginRoutes` function.
*   **Details**:
    *   Iterate through `specRegistry.getAllRoutes()`.
    *   Use `router.addRoute(parentName, routeConfig)` instead of pushing to `children`.
    *   For routes starting with `/specs/`, add to `specs` parent route.
    *   For routes starting with `/tools/`, add to `tools` parent route.
    *   Ensure duplicate checks are performed using `router.hasRoute()` or by checking `router.getRoutes()`.

### 2. Fix Tools Index Page (`src/views/tools/index.vue`)
*   **Goal**: Correctly display tool descriptions.
*   **Action**: Update the template to access metadata correctly.
*   **Details**:
    *   Change `{{ tool.description || 'Tool' }}` to `{{ tool.meta?.description || tool.description || 'Tool' }}`.
    *   Ensure `tool.meta?.title` is prioritized over `tool.name`.

### 3. Update Homepage (`src/views/HomeView.vue`)
*   **Goal**: Make new tools discoverable from the landing page.
*   **Action**: Add new entries to the `quickLinks` array.
*   **Details**:
    *   Add "MIL-STD-202" link pointing to `/tools/mil-std-202`.
    *   Add "Superseding Lookup" link pointing to `/tools/superseding-lookup`.
    *   Update icons and descriptions for these links.

## Verification
*   **Router**: Verify `router.getRoutes()` contains the new nested routes.
*   **Tools Index**: Verify the sidebar lists the new tools with correct titles and descriptions.
*   **Homepage**: Verify the "Quick Actions" section shows the new cards.
