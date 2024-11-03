import Button from '../ui/Button';
import Link from 'next/link';

const ProCTA = () => {
  return (
    <Link href="/pricing">
      <Button variant="cta" type="submit" form="couponForm">
        Get Pro
      </Button>
    </Link>
  );
};

export default ProCTA