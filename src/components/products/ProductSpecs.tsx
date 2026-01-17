import { ProductSpec } from '@/lib/types';

interface ProductSpecsProps {
  specs: ProductSpec[];
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
  };
}

export function ProductSpecs({ specs, dimensions }: ProductSpecsProps) {
  const allSpecs = [...specs];

  // Add dimensions to specs if available
  if (dimensions) {
    if (dimensions.length && dimensions.width && dimensions.height) {
      allSpecs.push({
        name: '외형 치수 (L x W x H)',
        value: `${dimensions.length} x ${dimensions.width} x ${dimensions.height}`,
        unit: 'mm',
      });
    }
    if (dimensions.weight) {
      allSpecs.push({
        name: '중량',
        value: dimensions.weight,
        unit: 'kg',
      });
    }
  }

  if (allSpecs.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full">
        <tbody>
          {allSpecs.map((spec, index) => (
            <tr
              key={spec.name}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-1/3 border-r border-gray-200">
                {spec.name}
              </th>
              <td className="px-4 py-3 text-sm text-gray-900">
                {spec.value}
                {spec.unit && <span className="text-gray-500 ml-1">{spec.unit}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
