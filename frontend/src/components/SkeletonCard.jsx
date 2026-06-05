import { Card, CardContent, Skeleton, Box } from '@mui/material';

/**
 * Placeholder card shown while posts are loading.
 */
const SkeletonCard = () => (
  <Card sx={{ mb: 2.5, borderRadius: 3 }}>
    <CardContent>
      {/* Avatar + name row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="35%" height={14} />
          <Skeleton width="20%" height={12} sx={{ mt: 0.5 }} />
        </Box>
      </Box>

      {/* Text lines */}
      <Skeleton variant="rectangular" height={16} sx={{ borderRadius: 1, mb: 0.75 }} />
      <Skeleton variant="rectangular" height={16} sx={{ borderRadius: 1, mb: 0.75, width: '80%' }} />

      {/* Image placeholder */}
      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1, mt: 1.5 }} />
    </CardContent>
  </Card>
);

export default SkeletonCard;
