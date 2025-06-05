import React from 'react';

const CVSection = ({ title, items, icon }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center">
                {icon && <span className="mr-3">{icon}</span>}
                {title}
            </h2>
            <div className="space-y-8">
                {items.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 dark:border-blue-300 pl-6 py-2 relative">
                        <div className="absolute -left-2 top-3 w-4 h-4 bg-blue-500 dark:bg-blue-300 rounded-full border-4 border-white dark:border-gray-800"></div>

                        {item.mainTitle && (
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                                {item.mainTitle}
                            </h3>
                        )}
                        {item.subTitle && (
                            <p className="text-md font-medium text-gray-600 dark:text-gray-300 mb-1">
                                {item.subTitle}
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {item.date && <span>{item.date}</span>}
                            {item.location && <span>{item.location}</span>}
                        </div>

                        {item.description && (
                            <div className="text-gray-700 dark:text-gray-200 mt-2 prose prose-sm dark:prose-invert max-w-none">
                                {Array.isArray(item.description) ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {item.description.map((descPoint, i) => (
                                            <li key={i}>{descPoint}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{item.description}</p>
                                )}
                            </div>
                        )}

                        {item.technologies && item.technologies.length > 0 && (
                            <div className="mt-3">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                    Tecnologías:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CVSection;