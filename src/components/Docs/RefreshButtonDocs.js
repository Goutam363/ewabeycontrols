import { Card, CardContent, Typography } from '@mui/material';

export default function RefreshButtonDocs() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Refresh Button Usage
        </Typography>
        <Typography variant="body1" gutterBottom>
          When working with tables or data grids in web applications, it's common to provide a refresh button to update the data displayed in the table without reloading the entire page.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Why Use a Refresh Button?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Using a refresh button allows you to update the table data dynamically without disrupting their current interaction with the application. It provides a smoother and more seamless experience compared to manually refreshing the entire page using the browser reload button.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Advantages of Using a Refresh Button
        </Typography>
        <ul>
          <li>Improves your experience by updating data asynchronously.</li>
          <li>Minimizes disruption to your workflow.</li>
          <li>Reduces unnecessary page reloads, saving bandwidth and resources.</li>
        </ul>
        <Typography variant="h6" component="h3" gutterBottom>
          Avoid Using Browser Reload Buttons
        </Typography>
        <Typography variant="body1" gutterBottom>
          While browser reload buttons can refresh the entire page, they are not suitable for updating specific components like tables or data grids. Reloading the entire page disrupts the experience and may cause loss of unsaved data.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Instead, it is encouraged to use the refresh button provided within the application's interface to update specific sections of content.
        </Typography>
      </CardContent>
    </Card>
  )
}
