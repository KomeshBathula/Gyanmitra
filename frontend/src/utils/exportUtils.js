/**
 * Utility functions for exporting reports, certificates, and ACBP audit data.
 */

/**
 * Download arbitrary data as a formatted JSON file.
 * @param {object|array} data - Data to export
 * @param {string} filename - Desired filename
 */
export function exportToJSON(data, filename = 'export.json') {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert array of objects to CSV format and trigger download.
 * @param {array} dataArray - List of objects to convert
 * @param {string} filename - Desired CSV filename
 */
export function exportToCSV(dataArray, filename = 'report.csv') {
  if (!dataArray || !dataArray.length) return;

  const headers = Object.keys(dataArray[0]);
  const csvRows = [headers.join(',')];

  for (const row of dataArray) {
    const values = headers.map((header) => {
      const val = row[header] !== undefined && row[header] !== null ? row[header] : '';
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
