export const networkRepo = 'https://github.com/sahan24854/Network-coverage-changes-detection';
export const networkFacts = [
  { value: '14 days', label: 'Observation window' },
  { value: '20 m', label: 'Spatial grid resolution' },
  { value: '4 classes', label: 'Coverage patterns' },
  { value: 'ConvLSTM', label: 'Spatial + temporal learning' },
];
export const networkStages = [
  { name: 'Prepare', tool: 'Microsoft Fabric · PySpark', title: 'Start with a complete observation window', description: 'Cleaned MR/MDT observations are filtered, deduplicated by grid and date, and exported as date-partitioned Parquet. Immutable manifests keep each scoring run tied to its inputs.', file: 'fabric/export.py' },
  { name: 'Represent', tool: 'NumPy · sparse staging', title: 'Turn observations into geographic patches', description: 'A 14-day presence history is prepared for each observed 20 m cell. Tiled processing bounds memory; training uses 128 × 128 patches and geographically separated validation footprints.', file: 'scripts/national_data.py' },
  { name: 'Learn', tool: 'PyTorch · ConvLSTM', title: 'Learn how coverage patterns change', description: 'A two-layer ConvLSTM feeds a four-class spatial head. Focal and Dice loss, change-patch sampling, AdamW, and early stopping support training on imbalanced labels.', file: 'scripts/model_architecture.py' },
  { name: 'Score', tool: 'Azure ML · batch pipeline', title: 'Reuse the registered model', description: 'The Azure ML DAG prepares a later observation window, runs registered-model inference, and builds output layers. Training and daily batch scoring are separate workflows.', file: 'scripts/scoring_pipeline.py' },
  { name: 'Cluster', tool: 'DBSCAN · geospatial geometry', title: 'Group changed cells into reviewable zones', description: 'Reduction and expansion cells are clustered separately using metric distances and cross-tile stitching. Zone boundaries are unions of member cells rather than convex hulls.', file: 'scripts/national_publish.py' },
  { name: 'Publish', tool: 'PostgreSQL · PostGIS · QGIS', title: 'Prepare consistent layers for map review', description: 'The publisher stages predictions and zones, then promotes both in one transaction with retry protection and five-calendar-day retention. Live activation of this new publication path remains pending.', file: 'fabric/publish_daily.py' },
];
export const networkClasses = [
  { name: 'Stable covered', key: 'covered', color: '#76bf95', description: 'High weighted observation presence across the window, without a dominant change label.' },
  { name: 'Stable hole', key: 'hole', color: '#a7a9b4', description: 'Low weighted observation presence. This is a telemetry-derived label, not proof of a physical coverage hole.' },
  { name: 'Coverage reduction', key: 'reduction', color: '#f08e74', description: 'Weighted presence falls between the older and newer seven-day periods.' },
  { name: 'Coverage expansion', key: 'expansion', color: '#e9cc55', description: 'Weighted presence rises between the older and newer seven-day periods.' },
];
