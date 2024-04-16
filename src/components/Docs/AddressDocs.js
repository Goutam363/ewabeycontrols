import { Card, CardContent, Typography } from '@mui/material';
export default function AddressDocs() {
  return (
    <Card variant="outlined" sx={{my:"1rem"}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          User Address Documentation
        </Typography>
        <Typography variant="body1" gutterBottom>
          In our database, we store user addresses in a specific format. Each address is represented as a single string with individual address components separated by the "|" (pipe) character.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Address Components
        </Typography>
        <ul>
          <li><strong>Country</strong>: The country where the user resides.</li>
          <li><strong>State</strong>: The state or region within the country.</li>
          <li><strong>City</strong>: The city or locality within the state.</li>
          <li><strong>House Number</strong>: The house number or building name.</li>
          <li><strong>Zip Code</strong>: The postal code or ZIP code.</li>
        </ul>

        <Typography variant="h6" component="h3" gutterBottom>
          Address Format
        </Typography>
        <Typography variant="body1" gutterBottom>
          The address is stored in the following format:
        </Typography>
        <Typography variant="body1" component="pre" gutterBottom>
          Country|State|City|House Number|Zip Code
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Example
        </Typography>
        <Typography variant="body1" component="pre" style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }} gutterBottom>
          United States|California|San Francisco|123 Main Street|94105
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Notes
        </Typography>
        <ul>
          <li>
            The "|" (pipe) character is used as a delimiter to separate individual address components.
          </li>
          <li>
            Each address must have all components in the specified order, even if some components are not applicable.
          </li>
        </ul>

        <Typography variant="h6" component="h3" gutterBottom>
          Usage
        </Typography>
        <Typography variant="body1" gutterBottom>
          When updating an address of the user, make sure to separate the strings using the "|" character.
        </Typography>
        <Typography variant="body1" component="pre" gutterBottom>
          const address = "United States|California|San Francisco|123 Main Street|94105";
          const components = address.split('|');
          console.log(components);
          // Output: ["United States", "California", "San Francisco", "123 Main Street", "94105"]
        </Typography>
      </CardContent>
    </Card>
  );
}
