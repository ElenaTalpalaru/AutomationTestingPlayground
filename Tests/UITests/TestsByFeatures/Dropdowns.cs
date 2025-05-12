using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;

namespace UITests

/*
 * - **Dropdowns**: Element selection and text verification
- **Alerts**: Different types of browser dialogs
- **Checkboxes**: Show/hide content based on selection
- **Input Fields**: Text validation with different rules
- **Dynamic Content**: Loading states and dynamic DOM updates
- **Tables**: Sortable data and table interactions
- **Drag and Drop**: Element movement between containers
- **Progress Bar**: Visual progress tracking 
- **Images**: Display toggling and state changes
- **Hover Effects**: Mouse interaction events
- **Radio Buttons**: Option selection and result display
- **iFrames**: Cross-frame content interaction
*/
{
    public class Dropdowns : PageTest
    {
        [Fact]
        public async Task Dropdown()
        {
            await Page.GotoAsync("https://elenatalpalaru.github.io/AutomationTestingPlayground/");

            await Expect(Page.Locator("#testDropdown")).
                ToContainTextAsync("-- Select an option -- Option 1 Option 2 Option 3");

           
        }
    }
}
