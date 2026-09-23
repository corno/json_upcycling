import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-core/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-core/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Properties = p_.Transformer<
        s_source.Properties,
        s_target.Value
    >
    
    export type Value = p_.Transformer<
        s_source.Value,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
}

// implementations

export const Properties: declarations.Properties = (
    $,
) => ['dictionary', p_.from.dictionary($).map(
    (
        $,
        id,
    ) => ['group', ['verbose', p_.literal.dictionary({
        "optional": p_.change_context(
            $['optional'],
            (
                $,
            ) => ['text', {
                'delimiter': ['none', null],
                'value': ser_primitives.true_false(
                    $,
                ),
            }],
        ),
        "value": p_.change_context(
            $['value'],
            (
                $,
            ) => Value(
                $,
            ),
        ),
    })]],
)]

export const Value: declarations.Value = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'array': return p_.option($, (
                $,
            ) => ({
                'option': 'array',
                'value': ['state', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.state => {
                        switch ($[0]) {
                            case 'list': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'list',
                                'value': Value(
                                    $,
                                ),
                            }))
                            case 'group': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'group',
                                'value': ['group', ['verbose', p_.literal.dictionary({
                                    "properties": p_.change_context(
                                        $['properties'],
                                        (
                                            $,
                                        ) => ['dictionary', p_.from.dictionary($).map(
                                            (
                                                $,
                                                id,
                                            ) => ['group', ['verbose', p_.literal.dictionary({
                                                "value": p_.change_context(
                                                    $['value'],
                                                    (
                                                        $,
                                                    ) => Value(
                                                        $,
                                                    ),
                                                ),
                                            })]],
                                        )],
                                    ),
                                })]],
                            }))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'cycle up',
                                'value': ['state', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.state => {
                                        switch ($[0]) {
                                            case 'unique strings': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'unique strings',
                                                'value': ['nothing', null],
                                            }))
                                            case 'indexed objects': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'indexed objects',
                                                'value': ['group', ['verbose', p_.literal.dictionary({
                                                    "indexing property": p_.change_context(
                                                        $['indexing property'],
                                                        (
                                                            $,
                                                        ) => ['text', {
                                                            'delimiter': ['quote', null],
                                                            'value': $,
                                                        }],
                                                    ),
                                                    "properties": p_.change_context(
                                                        $['properties'],
                                                        (
                                                            $,
                                                        ) => Properties(
                                                            $,
                                                        ),
                                                    ),
                                                })]],
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            }))
            case 'boolean': return p_.option($, (
                $,
            ) => ({
                'option': 'boolean',
                'value': ['nothing', null],
            }))
            case 'component': return p_.option($, (
                $,
            ) => ({
                'option': 'component',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'number': return p_.option($, (
                $,
            ) => ({
                'option': 'number',
                'value': ['state', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.state => {
                        switch ($[0]) {
                            case 'integer': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'integer',
                                'value': ['group', ['verbose', p_.literal.dictionary({
                                    "minimum": p_.change_context(
                                        $['minimum'],
                                        (
                                            $,
                                        ) => ['optional', p_.from.optional($).decide(
                                            (
                                                $,
                                            ): s_target.Value.optional => ['set', ['text', {
                                                'delimiter': ['none', null],
                                                'value': ser_primitives.decimal(
                                                    $,
                                                ),
                                            }]],
                                            (): s_target.Value.optional => ['not set', null],
                                        )],
                                    ),
                                })]],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            }))
            case 'null': return p_.option($, (
                $,
            ) => ({
                'option': 'null',
                'value': ['nothing', null],
            }))
            case 'nullable': return p_.option($, (
                $,
            ) => ({
                'option': 'nullable',
                'value': Value(
                    $,
                ),
            }))
            case 'object': return p_.option($, (
                $,
            ) => ({
                'option': 'object',
                'value': ['state', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.state => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'dictionary',
                                'value': Value(
                                    $,
                                ),
                            }))
                            case 'group': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'group',
                                'value': ['group', ['verbose', p_.literal.dictionary({
                                    "properties": p_.change_context(
                                        $['properties'],
                                        (
                                            $,
                                        ) => Properties(
                                            $,
                                        ),
                                    ),
                                })]],
                            }))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'cycle up',
                                'value': ['state', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.state => {
                                        switch ($[0]) {
                                            case 'discriminated': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'discriminated',
                                                'value': ['group', ['verbose', p_.literal.dictionary({
                                                    "discriminating property": p_.change_context(
                                                        $['discriminating property'],
                                                        (
                                                            $,
                                                        ) => ['text', {
                                                            'delimiter': ['quote', null],
                                                            'value': $,
                                                        }],
                                                    ),
                                                    "options": p_.change_context(
                                                        $['options'],
                                                        (
                                                            $,
                                                        ) => ['dictionary', p_.from.dictionary($).map(
                                                            (
                                                                $,
                                                                id,
                                                            ) => Value(
                                                                $,
                                                            ),
                                                        )],
                                                    ),
                                                })]],
                                            }))
                                            case 'discriminated with fallback': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'discriminated with fallback',
                                                'value': ['group', ['verbose', p_.literal.dictionary({
                                                    "discriminating property": p_.change_context(
                                                        $['discriminating property'],
                                                        (
                                                            $,
                                                        ) => ['text', {
                                                            'delimiter': ['quote', null],
                                                            'value': $,
                                                        }],
                                                    ),
                                                    "options": p_.change_context(
                                                        $['options'],
                                                        (
                                                            $,
                                                        ) => ['dictionary', p_.from.dictionary($).map(
                                                            (
                                                                $,
                                                                id,
                                                            ) => Value(
                                                                $,
                                                            ),
                                                        )],
                                                    ),
                                                    "fallback": p_.change_context(
                                                        $['fallback'],
                                                        (
                                                            $,
                                                        ) => Value(
                                                            $,
                                                        ),
                                                    ),
                                                })]],
                                            }))
                                            case 'group and dictionary mixed': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'group and dictionary mixed',
                                                'value': ['group', ['verbose', p_.literal.dictionary({
                                                    "properties": p_.change_context(
                                                        $['properties'],
                                                        (
                                                            $,
                                                        ) => Properties(
                                                            $,
                                                        ),
                                                    ),
                                                    "additional properties": p_.change_context(
                                                        $['additional properties'],
                                                        (
                                                            $,
                                                        ) => Value(
                                                            $,
                                                        ),
                                                    ),
                                                })]],
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            }))
            case 'string': return p_.option($, (
                $,
            ) => ({
                'option': 'string',
                'value': ['state', p_.from.state($).decide(
                    (
                        $,
                    ): s_target.Value.state => {
                        switch ($[0]) {
                            case 'text': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'text',
                                'value': ['nothing', null],
                            }))
                            case 'cycle up': return p_.option($, (
                                $,
                            ) => ({
                                'option': 'cycle up',
                                'value': ['state', p_.from.state($).decide(
                                    (
                                        $,
                                    ): s_target.Value.state => {
                                        switch ($[0]) {
                                            case 'enumeration': return p_.option($, (
                                                $,
                                            ) => ({
                                                'option': 'enumeration',
                                                'value': ['dictionary', p_.from.dictionary($).map(
                                                    (
                                                        $,
                                                        id,
                                                    ) => ['nothing', null],
                                                )],
                                            }))
                                            default: return p_.exhaustive($[0])
                                        }
                                    },
                                )],
                            }))
                            default: return p_.exhaustive($[0])
                        }
                    },
                )],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Root: declarations.Root = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "types": p_.change_context(
        $['types'],
        (
            $,
        ) => ['dictionary', p_.from.dictionary($).map(
            (
                $,
                id,
            ) => Value(
                $,
            ),
        )],
    ),
    "root type": p_.change_context(
        $['root type'],
        (
            $,
        ) => ['text', {
            'delimiter': ['quote', null],
            'value': $,
        }],
    ),
})]]
