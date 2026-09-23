import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-core/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
    export type Properties = p_.Refiner<
        s_target.Properties,
        s_error.Error,
        s_source.Properties
    >
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Root
    >
}

// implementations

export const Properties: declarations.Properties = (
    $,
    abort,
) => p_.from.dictionary($).map(
    (
        $,
        id,
    ) => ({
        'optional': p_.change_context(
            $['optional'],
            (
                $,
            ) => $,
        ),
        'value': p_.change_context(
            $['value'],
            (
                $,
            ) => Value(
                $,
                abort,
            ),
        ),
    }),
)

export const Value: declarations.Value = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Value => {
        switch ($[0]) {
            case 'array': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['array', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.array => {
                        switch ($[0]) {
                            case 'list': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['list', Value(
                                    $,
                                    abort,
                                )],
                            ))
                            case 'group': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['group', {
                                    'properties': p_.change_context(
                                        $['properties'],
                                        (
                                            $,
                                        ) => p_.from.dictionary($).map(
                                            (
                                                $,
                                                id,
                                            ) => ({
                                                'value': p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => Value(
                                                        $,
                                                        abort,
                                                    ),
                                                ),
                                            }),
                                        ),
                                    ),
                                }],
                            ))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['cycle up', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.array.cycle_up => {
                                        switch ($[0]) {
                                            case 'unique strings': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['unique strings', null],
                                            ))
                                            case 'indexed objects': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['indexed objects', {
                                                    'indexing property': p_.change_context(
                                                        $['indexing property'],
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                    'properties': p_.change_context(
                                                        $['properties'],
                                                        (
                                                            $,
                                                        ) => Properties(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                }],
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            ))
            case 'boolean': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['boolean', null],
            ))
            case 'component': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['component', $],
            ))
            case 'number': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['number', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.number_ => {
                        switch ($[0]) {
                            case 'integer': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['integer', {
                                    'minimum': p_.change_context(
                                        $['minimum'],
                                        (
                                            $,
                                        ) => p_.from.optional($).map(
                                            (
                                                $,
                                            ) => $,
                                        ),
                                    ),
                                }],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            ))
            case 'null': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['null', null],
            ))
            case 'nullable': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['nullable', Value(
                    $,
                    abort,
                )],
            ))
            case 'object': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['object', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.object_ => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['dictionary', Value(
                                    $,
                                    abort,
                                )],
                            ))
                            case 'group': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['group', {
                                    'properties': p_.change_context(
                                        $['properties'],
                                        (
                                            $,
                                        ) => Properties(
                                            $,
                                            abort,
                                        ),
                                    ),
                                }],
                            ))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['cycle up', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.object_.cycle_up => {
                                        switch ($[0]) {
                                            case 'discriminated': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['discriminated', {
                                                    'discriminating property': p_.change_context(
                                                        $['discriminating property'],
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                    'options': p_.change_context(
                                                        $['options'],
                                                        (
                                                            $,
                                                        ) => p_.from.dictionary($).map(
                                                            (
                                                                $,
                                                                id,
                                                            ) => Value(
                                                                $,
                                                                abort,
                                                            ),
                                                        ),
                                                    ),
                                                }],
                                            ))
                                            case 'discriminated with fallback': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['discriminated with fallback', {
                                                    'discriminating property': p_.change_context(
                                                        $['discriminating property'],
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                    'options': p_.change_context(
                                                        $['options'],
                                                        (
                                                            $,
                                                        ) => p_.from.dictionary($).map(
                                                            (
                                                                $,
                                                                id,
                                                            ) => Value(
                                                                $,
                                                                abort,
                                                            ),
                                                        ),
                                                    ),
                                                    'fallback': p_.change_context(
                                                        $['fallback'],
                                                        (
                                                            $,
                                                        ) => Value(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                }],
                                            ))
                                            case 'group and dictionary mixed': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['group and dictionary mixed', {
                                                    'properties': p_.change_context(
                                                        $['properties'],
                                                        (
                                                            $,
                                                        ) => Properties(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                    'additional properties': p_.change_context(
                                                        $['additional properties'],
                                                        (
                                                            $,
                                                        ) => Value(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                }],
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            ))
            case 'string': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['string', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.string_ => {
                        switch ($[0]) {
                            case 'text': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['text', null],
                            ))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => p_.change_context(
                                $,
                                (
                                    $,
                                ) => ['cycle up', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.string_.cycle_up => {
                                        switch ($[0]) {
                                            case 'enumeration': return p_.option($, (
                                                $,
                                            ) => p_.change_context(
                                                $,
                                                (
                                                    $,
                                                ) => ['enumeration', p_.from.dictionary($).map(
                                                    (
                                                        $,
                                                        id,
                                                    ) => null,
                                                )],
                                            ))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            ))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Root: declarations.Root = (
    $,
    abort,
) => ({
    'types': p_.change_context(
        $['types'],
        (
            $,
        ) => p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Value(
                $,
                abort,
            ),
        ),
    ),
    'root type': p_.change_context(
        $['root type'],
        (
            $,
        ) => $,
    ),
})
