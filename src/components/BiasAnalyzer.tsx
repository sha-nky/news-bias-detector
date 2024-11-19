import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { invokeSageMakerEndpoint } from '../invokeSageMakerEndpoint';

export default function BiasAnalyzer() {
  const [article, setArticle] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeArticle = async () => {
    if (!article.trim()) {
      setError('Please enter an article to analyze');
      return;
    }

    const truncatedArticle = article.slice(0, 2500);
  
    setLoading(true);
    setError('');
    setResult(null);
  
    try {
      const response = await invokeSageMakerEndpoint(truncatedArticle);
      console.log(response)
  
      setResult(response.predicted_class || 'Analysis complete: No significant bias detected');
    } catch (err) {
      setError('Failed to analyze article. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(article.length);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <label htmlFor="article" className="block text-lg font-medium text-gray-700">
          Enter News Article
        </label>
        <textarea
          id="article"
          rows={8}
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste your news article here..."
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={analyzeArticle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Article'
        )}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Result</h3>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}