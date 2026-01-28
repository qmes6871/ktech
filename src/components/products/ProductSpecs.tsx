import { ProductSpec } from '@/lib/types';

interface ProductSpecsProps {
  specs: ProductSpec[];
  specificationsText?: string;
  specificationsHtml?: string;
}

export function ProductSpecs({ specs, specificationsText, specificationsHtml }: ProductSpecsProps) {
  const hasSpecs = specs.length > 0;
  const hasSpecsText = specificationsText && specificationsText.trim().length > 0;
  const hasSpecsHtml = specificationsHtml && specificationsHtml.trim().length > 0;

  if (!hasSpecs && !hasSpecsText && !hasSpecsHtml) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Specifications - HTML rendering */}
      {(hasSpecsHtml || hasSpecsText) && (
        <div
          className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: specificationsHtml || specificationsText || '' }}
        />
      )}

      {/* Table specifications (legacy) */}
      {hasSpecs && (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <tbody>
              {specs.map((spec, index) => (
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
      )}
    </div>
  );
}
