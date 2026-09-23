import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-core/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-core/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-core/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type Properties = p_.Refiner<
        s_target.Properties,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Properties: declarations.Properties = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Dictionary(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.dictionary($['entries']).map(
        (
            $,
            id,
        ) => p_.change_context(
            r_unmarshalled_from_parse_tree.Verbose_Group(
                $,
                abort,
                {
                    'expected properties': p_.literal.dictionary({
                        "optional": null,
                        "value": null,
                    }),
                },
            ),
            (
                $,
            ) => ({
                'optional': p_.change_context(
                    r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'optional',
                        },
                    ),
                    (
                        $,
                    ) => r_unmarshalled_from_parse_tree.Boolean(
                        $,
                        abort,
                        {
                            'type': ['true/false', null],
                        },
                    ),
                ),
                'value': p_.change_context(
                    r_unmarshalled_from_parse_tree.Property(
                        $,
                        abort,
                        {
                            'id': 'value',
                        },
                    ),
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
)

export const Value: declarations.Value = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.text($['option']['token']['value']).to_state(
        (
            $text,
        ): s_target.Value => {
            switch ($text) {
                case "array": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['array', p_.change_context(
                        r_unmarshalled_from_parse_tree.State(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.text($['option']['token']['value']).to_state(
                            (
                                $text,
                            ): s_target.Value.array => {
                                switch ($text) {
                                    case "list": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['list', Value(
                                            $,
                                            abort,
                                        )],
                                    )
                                    case "group": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['group', p_.change_context(
                                            r_unmarshalled_from_parse_tree.Verbose_Group(
                                                $,
                                                abort,
                                                {
                                                    'expected properties': p_.literal.dictionary({
                                                        "properties": null,
                                                    }),
                                                },
                                            ),
                                            (
                                                $,
                                            ) => ({
                                                'properties': p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        abort,
                                                        {
                                                            'id': 'properties',
                                                        },
                                                    ),
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.Dictionary(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.dictionary($['entries']).map(
                                                            (
                                                                $,
                                                                id,
                                                            ) => p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                    $,
                                                                    abort,
                                                                    {
                                                                        'expected properties': p_.literal.dictionary({
                                                                            "value": null,
                                                                        }),
                                                                    },
                                                                ),
                                                                (
                                                                    $,
                                                                ) => ({
                                                                    'value': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'value',
                                                                            },
                                                                        ),
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
                                                    ),
                                                ),
                                            }),
                                        )],
                                    )
                                    case "cycle up": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['cycle up', p_.change_context(
                                            r_unmarshalled_from_parse_tree.State(
                                                $,
                                                abort,
                                            ),
                                            (
                                                $,
                                            ) => p_.from.text($['option']['token']['value']).to_state(
                                                (
                                                    $text,
                                                ): s_target.Value.array.cycle_up => {
                                                    switch ($text) {
                                                        case "unique strings": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['unique strings', r_unmarshalled_from_parse_tree.Nothing(
                                                                $,
                                                                abort,
                                                            )],
                                                        )
                                                        case "indexed objects": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['indexed objects', p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                    $,
                                                                    abort,
                                                                    {
                                                                        'expected properties': p_.literal.dictionary({
                                                                            "indexing property": null,
                                                                            "properties": null,
                                                                        }),
                                                                    },
                                                                ),
                                                                (
                                                                    $,
                                                                ) => ({
                                                                    'indexing property': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'indexing property',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                    'properties': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'properties',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => Properties(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                }),
                                                            )],
                                                        )
                                                        default: return abort(
                                                            ['liana', {
                                                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                'range': $['option']['range'],
                                                            }],
                                                        )
                                                    }
                                                },
                                            ),
                                        )],
                                    )
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            },
                        ),
                    )],
                )
                case "boolean": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['boolean', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )],
                )
                case "component": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['component', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "number": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['number', p_.change_context(
                        r_unmarshalled_from_parse_tree.State(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.text($['option']['token']['value']).to_state(
                            (
                                $text,
                            ): s_target.Value.number_ => {
                                switch ($text) {
                                    case "integer": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['integer', p_.change_context(
                                            r_unmarshalled_from_parse_tree.Verbose_Group(
                                                $,
                                                abort,
                                                {
                                                    'expected properties': p_.literal.dictionary({
                                                        "minimum": null,
                                                    }),
                                                },
                                            ),
                                            (
                                                $,
                                            ) => ({
                                                'minimum': p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        abort,
                                                        {
                                                            'id': 'minimum',
                                                        },
                                                    ),
                                                    (
                                                        $,
                                                    ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                        $,
                                                        abort,
                                                    )['optional']).map(
                                                        (
                                                            $,
                                                        ) => r_unmarshalled_from_parse_tree.Number(
                                                            $,
                                                            abort,
                                                            {
                                                                'type': ['decimal', null],
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            }),
                                        )],
                                    )
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            },
                        ),
                    )],
                )
                case "null": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['null', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )],
                )
                case "nullable": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['nullable', Value(
                        $,
                        abort,
                    )],
                )
                case "object": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['object', p_.change_context(
                        r_unmarshalled_from_parse_tree.State(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.text($['option']['token']['value']).to_state(
                            (
                                $text,
                            ): s_target.Value.object_ => {
                                switch ($text) {
                                    case "dictionary": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['dictionary', Value(
                                            $,
                                            abort,
                                        )],
                                    )
                                    case "group": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['group', p_.change_context(
                                            r_unmarshalled_from_parse_tree.Verbose_Group(
                                                $,
                                                abort,
                                                {
                                                    'expected properties': p_.literal.dictionary({
                                                        "properties": null,
                                                    }),
                                                },
                                            ),
                                            (
                                                $,
                                            ) => ({
                                                'properties': p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Property(
                                                        $,
                                                        abort,
                                                        {
                                                            'id': 'properties',
                                                        },
                                                    ),
                                                    (
                                                        $,
                                                    ) => Properties(
                                                        $,
                                                        abort,
                                                    ),
                                                ),
                                            }),
                                        )],
                                    )
                                    case "cycle up": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['cycle up', p_.change_context(
                                            r_unmarshalled_from_parse_tree.State(
                                                $,
                                                abort,
                                            ),
                                            (
                                                $,
                                            ) => p_.from.text($['option']['token']['value']).to_state(
                                                (
                                                    $text,
                                                ): s_target.Value.object_.cycle_up => {
                                                    switch ($text) {
                                                        case "discriminated": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['discriminated', p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                    $,
                                                                    abort,
                                                                    {
                                                                        'expected properties': p_.literal.dictionary({
                                                                            "discriminating property": null,
                                                                            "options": null,
                                                                        }),
                                                                    },
                                                                ),
                                                                (
                                                                    $,
                                                                ) => ({
                                                                    'discriminating property': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'discriminating property',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                    'options': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'options',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => p_.change_context(
                                                                            r_unmarshalled_from_parse_tree.Dictionary(
                                                                                $,
                                                                                abort,
                                                                            ),
                                                                            (
                                                                                $,
                                                                            ) => p_.from.dictionary($['entries']).map(
                                                                                (
                                                                                    $,
                                                                                    id,
                                                                                ) => Value(
                                                                                    $,
                                                                                    abort,
                                                                                ),
                                                                            ),
                                                                        ),
                                                                    ),
                                                                }),
                                                            )],
                                                        )
                                                        case "discriminated with fallback": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['discriminated with fallback', p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                    $,
                                                                    abort,
                                                                    {
                                                                        'expected properties': p_.literal.dictionary({
                                                                            "discriminating property": null,
                                                                            "options": null,
                                                                            "fallback": null,
                                                                        }),
                                                                    },
                                                                ),
                                                                (
                                                                    $,
                                                                ) => ({
                                                                    'discriminating property': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'discriminating property',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                    'options': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'options',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => p_.change_context(
                                                                            r_unmarshalled_from_parse_tree.Dictionary(
                                                                                $,
                                                                                abort,
                                                                            ),
                                                                            (
                                                                                $,
                                                                            ) => p_.from.dictionary($['entries']).map(
                                                                                (
                                                                                    $,
                                                                                    id,
                                                                                ) => Value(
                                                                                    $,
                                                                                    abort,
                                                                                ),
                                                                            ),
                                                                        ),
                                                                    ),
                                                                    'fallback': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'fallback',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => Value(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                }),
                                                            )],
                                                        )
                                                        case "group and dictionary mixed": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['group and dictionary mixed', p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                    $,
                                                                    abort,
                                                                    {
                                                                        'expected properties': p_.literal.dictionary({
                                                                            "properties": null,
                                                                            "additional properties": null,
                                                                        }),
                                                                    },
                                                                ),
                                                                (
                                                                    $,
                                                                ) => ({
                                                                    'properties': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'properties',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => Properties(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                    'additional properties': p_.change_context(
                                                                        r_unmarshalled_from_parse_tree.Property(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'id': 'additional properties',
                                                                            },
                                                                        ),
                                                                        (
                                                                            $,
                                                                        ) => Value(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                }),
                                                            )],
                                                        )
                                                        default: return abort(
                                                            ['liana', {
                                                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                'range': $['option']['range'],
                                                            }],
                                                        )
                                                    }
                                                },
                                            ),
                                        )],
                                    )
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            },
                        ),
                    )],
                )
                case "string": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['string', p_.change_context(
                        r_unmarshalled_from_parse_tree.State(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.text($['option']['token']['value']).to_state(
                            (
                                $text,
                            ): s_target.Value.string_ => {
                                switch ($text) {
                                    case "text": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['text', r_unmarshalled_from_parse_tree.Nothing(
                                            $,
                                            abort,
                                        )],
                                    )
                                    case "cycle up": return p_.change_context(
                                        $['value'],
                                        (
                                            $,
                                        ) => ['cycle up', p_.change_context(
                                            r_unmarshalled_from_parse_tree.State(
                                                $,
                                                abort,
                                            ),
                                            (
                                                $,
                                            ) => p_.from.text($['option']['token']['value']).to_state(
                                                (
                                                    $text,
                                                ): s_target.Value.string_.cycle_up => {
                                                    switch ($text) {
                                                        case "enumeration": return p_.change_context(
                                                            $['value'],
                                                            (
                                                                $,
                                                            ) => ['enumeration', p_.change_context(
                                                                r_unmarshalled_from_parse_tree.Dictionary(
                                                                    $,
                                                                    abort,
                                                                ),
                                                                (
                                                                    $,
                                                                ) => p_.from.dictionary($['entries']).map(
                                                                    (
                                                                        $,
                                                                        id,
                                                                    ) => r_unmarshalled_from_parse_tree.Nothing(
                                                                        $,
                                                                        abort,
                                                                    ),
                                                                ),
                                                            )],
                                                        )
                                                        default: return abort(
                                                            ['liana', {
                                                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                'range': $['option']['range'],
                                                            }],
                                                        )
                                                    }
                                                },
                                            ),
                                        )],
                                    )
                                    default: return abort(
                                        ['liana', {
                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                            'range': $['option']['range'],
                                        }],
                                    )
                                }
                            },
                        ),
                    )],
                )
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        },
    ),
)

export const Root: declarations.Root = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "types": null,
                "root type": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'types': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'types',
                },
            ),
            (
                $,
            ) => p_.change_context(
                r_unmarshalled_from_parse_tree.Dictionary(
                    $,
                    abort,
                ),
                (
                    $,
                ) => p_.from.dictionary($['entries']).map(
                    (
                        $,
                        id,
                    ) => Value(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
        'root type': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'root type',
                },
            ),
            (
                $,
            ) => r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            ),
        ),
    }),
)
